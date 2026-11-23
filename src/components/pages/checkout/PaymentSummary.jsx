
import { formatMoney } from "../../../utils/format-money";
import axios from "axios";
import { useNavigate } from "react-router";

function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await axios.post("/api/orders");
    await loadCart();
    navigate("/orders");
  };

  return (
    <>
      {paymentSummary && (
        <div
          className="payment-summary"
          data-testid="payment-summary-container"
        >
          <div className="payment-summary-title">
            Payment Summary
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-row"
          >
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-row"
          >
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row subtotal-row"
            data-testid="payment-summary-row"
          >
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-row"
          >
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row total-row"
            data-testid="payment-summary-row"
          >
            <div>Order total:</div>
            <div
              className="payment-summary-money"
              data-testid="payment-summary-total"
            >
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
            data-testid= 'place-order-button'
          >
            Place your order
          </button>
        </div>
      )}
    </>
  );
}

export default PaymentSummary;
