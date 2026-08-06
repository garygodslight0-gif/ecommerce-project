import { useState, useEffect } from "react";

import axios from "axios";
import "./checkout-header.css";
import "./checkout.css";
import { formatMoney } from "../utils/Formart-money";
import dayjs from "dayjs";
function Checkout({ items }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div  className="order-summary">
            {deliveryOptions.lenght > 0 && items.map((item) => {
              const selectedDeliveryOption = deliveryOptions.find(
                (deliveryOption) => {
                  return deliveryOption.id === item.deliveryOption.id;
                },
              );
              return (
                <div className="cart-item-container" key={item.productId}>
                  <div className="delivery-date">
                    {dayjs(
                      selectedDeliveryOption.estimatedDeliveryTimeMs,
                    ).format("dddd, MMMM D")}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" src={item.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">{item.product.name}</div>
                      <div className="product-price">
                        {formatMoney(item.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {item.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        let shippingPrice = "FREE Shipping";
                        if (deliveryOption.priceCents > 0) {
                          shippingPrice = `$${formatMoney(deliveryOption.priceCents)} - Shipping`;
                        }
                        return (
                          <div
                            key={deliveryOption.id}
                            className="delivery-option"
                          >
                            <input
                              type="radio"
                              checked={
                                deliveryOption.id === item.deliveryOption.id
                              }
                              className="delivery-option-input"
                              name={item.productId}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(
                                  deliveryOption.estimatedDeliveryTimeMs,
                                ).format("dddd, MMMM D")}
                              </div>
                              <div className="delivery-option-price">
                                {shippingPrice}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
export default Checkout;
