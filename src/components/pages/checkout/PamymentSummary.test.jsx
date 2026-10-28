import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PaymentSummay from "./PaymentSummary";
import { formatMoney } from "../../../utils/Format-money";
import { within } from "@testing-library/dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router";
import Location from "./location";

vi.mock("axios");
describe("PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;
  beforeEach(() => {
    loadCart = vi.fn();

    axios.post.mockImplementation(async (url) => {
      if (url === "/api/orders") {
        return Promise.resolve({ data: {} });
      }
    });
    paymentSummary = {
      totalItems: 1,
      productCostCents: 1090,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 1090,
      taxCents: 109,
      totalCostCents: 1199,
    };
  });

  it("renders the payment summary correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummay paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );
    const paymentSummaryContainer = screen.getAllByTestId(
      "payment-summary-row",
    );
    expect(paymentSummaryContainer.length).toBe(5);
    expect(
      within(paymentSummaryContainer[0]).getByText(
        formatMoney(paymentSummary.productCostCents),
      ),
    ).toBeInTheDocument();
    expect(
      within(paymentSummaryContainer[1]).getByText(
        formatMoney(paymentSummary.shippingCostCents),
      ),
    ).toBeInTheDocument();
    expect(
      within(paymentSummaryContainer[2]).getByText(
        formatMoney(paymentSummary.totalCostBeforeTaxCents),
      ),
    ).toBeInTheDocument();
    expect(
      within(paymentSummaryContainer[3]).getByText(
        formatMoney(paymentSummary.taxCents),
      ),
    ).toBeInTheDocument();
    expect(
      within(paymentSummaryContainer[4]).getByText(
        formatMoney(paymentSummary.totalCostCents),
      ),
    ).toBeInTheDocument();
    expect(paymentSummaryContainer[4]).toHaveTextContent("$11.99");
  });
  it("clicks the place order button and calls createOrder", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PaymentSummay paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location/>
      </MemoryRouter>,
    );

    const placeOrder = await user.click(
      screen.getByTestId("place-order-button"),
    );
    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();
       expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

  });
});
