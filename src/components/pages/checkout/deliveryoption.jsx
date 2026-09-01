import dayjs from "dayjs";
import { formatMoney } from "../../../utils/Formart-money";
import axios from "axios";
function Deliveryoption({ deliveryOptions, items, loadCart }) {
  return (
    <>
      {deliveryOptions.length > 0 &&
        items.map((item) => {
          
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === item.deliveryOptionId;
            }
          );

          const deleteCartItem = async  ()=>{
           await axios.delete(`/api/cart-items/${item.productId}`)
           await loadCart()
          };
          return (
            <div className="cart-item-container" key={item.productId}>
              <div className="delivery-date">
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
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
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                    >
                      
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
                    const updateDeliveryTime = async () => {
                      await axios.put(`/api/cart-items/${item.productId}`, {
                        deliveryOptionId: deliveryOption.id
                      });
                     await  loadCart();
                    };

                    return (
                      <div
                        key={deliveryOption.id}
                        className="delivery-option"
                        onClick={updateDeliveryTime}
                      >
                        <input
                          type="radio"
                          checked={deliveryOption.id === item.deliveryOptionId}
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
    </>
  );
}
export default Deliveryoption;
