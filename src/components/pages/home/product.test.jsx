import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi ,beforeEach } from "vitest";
import Product from "./product";
import axios from "axios";
import userEvent from "@testing-library/user-event";
vi.mock('axios');
    let product ;
    let loadCart ;
    let user ;
beforeEach (()=>{
product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    user = userEvent.setup()
    loadCart = vi.fn()
    vi.clearAllMocks()
   
})
describe("Product component", () => {
  it("displays the product details correctly ", () => {

    render(<Product product={product} loadCart={loadCart} />);
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });
  it  ('it adds a product to cart', async ()=>{
     

    render(<Product product={product} loadCart={loadCart} />);

     const user = userEvent.setup();
      const addToCartbutton = screen.getByTestId("add-to-cart-button");
      await user.click(addToCartbutton)
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1})
        expect(loadCart).toHaveBeenCalled()

  }) 
  it ('selects a quantity', async ()=>{
      render(<Product product={product} loadCart={loadCart} />);
     
     
     const quantitySelector = screen.getByTestId("product-quantity-container");
        const addToCartbutton = screen.getByTestId("add-to-cart-button");
     await user.selectOptions(quantitySelector,'3')
     
   
    
    expect(quantitySelector).toHaveValue("3")
    await user.click(addToCartbutton)
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3}) ;
       expect(loadCart).toHaveBeenCalled()
  })
   
});
