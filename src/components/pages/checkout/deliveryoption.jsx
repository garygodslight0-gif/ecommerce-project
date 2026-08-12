import dayjs from "dayjs";
function Deliveryoption ({deliveryOptions,items}){
return(
    <> 
    
                {deliveryOptions.length > 0 && items.map((item) => {
              console.log(item.product.image)
              const selectedDeliveryOption = deliveryOptions.find(
                (deliveryOption) => {
                  return deliveryOption.id === item.deliveryOptionId;
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
                                deliveryOption.id === item.deliveryOptionId
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
    </>
);
    
   

}
export default Deliveryoption