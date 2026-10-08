
import CartItemDetails from './CartItemDetails'
function Deliveryoption({ deliveryOptions, items, loadCart }) {
  return (
    <>
      {deliveryOptions.length > 0 &&
        items.map((item) => {
          return (
            <CartItemDetails
              key={item.productId}
              item={item}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          );
        })}
    </>
  );
}
export default Deliveryoption;
