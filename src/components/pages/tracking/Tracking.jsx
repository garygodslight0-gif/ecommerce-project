
import Header from "../../Header"
import './tracking.css'
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
function Tracking({items}) {
  const params = useParams();
 
 const {orderId, productId} = params;
 const [order, setOrder] = useState(null);
 useEffect(()=>{
  const getData = async ()=>{
  const response =  await axios.get(`/api/orders/${orderId}?expand=products`)
  setOrder(response.data)
  }
  getData()
 },[orderId])
 if (!order) {
  return null;
 }


 const orderProduct = order.products.find((product)=>product.productId === productId)
 const totalDeliveryTime = orderProduct.estimatedDeliveryTimeMs-order.orderTimeMs;
 const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
 let progressPercentage = (timePassedMs / totalDeliveryTime) * 100;
 if (progressPercentage > 100) {
  progressPercentage = 100;
 }
 const isPreparing = progressPercentage < 33;
 const isShipped = progressPercentage >= 33 && progressPercentage < 100;
 const isDelivered = progressPercentage === 100;

 
   return ( <>
      <title>Tracking</title>
   <Header items={items}/>
    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          {progressPercentage >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMM D ")}
        </div>

        <div className="product-info">
          {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} alt={orderProduct.product.name} />

        <div className={`progress-labels-container `}>
          <div className={`progress-label ${isPreparing && "current-status"}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && "current-status"}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && "current-status"}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar"
          style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
      </div>
    </div>
    </>)
}
export default Tracking