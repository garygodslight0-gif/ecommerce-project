import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Checkout from "./components/pages/checkout/Checkout";
import Homepage from "./components/pages/home/HomePage";
import Orders from "./components/pages/orders/Orders";
import Tracking from "./components/pages/tracking/Tracking";
import NotFound from "./components/pages/404";

function App() {
   const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

    const loadCart = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
  const paymentResponse = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    };

  const [items, setItems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setItems(response.data);
    };
    getData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Homepage items={items} loadCart={loadCart} />} />
      <Route path="/checkout" element={<Checkout items={items} deliveryOptions={deliveryOptions} paymentSummary={paymentSummary} loadCart={loadCart} />} />
      <Route path="/orders" element={<Orders items={items} />} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking items={items} />} />
      <Route path="*" element={<NotFound items={items} />} />
    </Routes>
  );
}
export default App;
