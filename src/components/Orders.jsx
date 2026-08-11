import Header from "./Header";
import './orders.css';
import  axios  from "axios";
import { useEffect, useState ,Fragment } from "react";
import BuyAgainIcon from "../assets/images/icons/buy-again.png"
import { formatMoney } from "../utils/Formart-money";
import dayjs from "dayjs";
function Orders({items}) {
 const [orders, setOrders] = useState([]);
 useEffect(() => {
   axios.get("/api/orders?expand=products").then((response) => {
     setOrders(response.data);
   }); 
 }, []);
 return ( <>
 <Header items={items} />  
    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">
        {orders.map((order)=>{
          return(
        <div className="order-container" key={order.id}>

          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMM D')} </div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatMoney(order.totalCostCents)} </div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>
             {}
          <div className="order-details-grid">
    
        { order.products.map((orderProducts)=>(
         <Fragment key={orderProducts.productId} >

        <div className="product-image-container" >
              <img src={orderProducts.product.image} />
            </div>

            <div className="product-details">   
              <div className="product-name">
               {orderProducts.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on:{dayjs(orderProducts.estimatedDeliveryTimeMs).format('MMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProducts.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

   
   </Fragment>
      ))}
          </div>
        </div>
       )})}



      </div>
    </div>
    
    </>)
}
export default Orders