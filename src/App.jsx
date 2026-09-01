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
      const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setItems(response.data);
    }; 

  const [items, setItems] = useState([]);
  useEffect(() => {

    loadCart();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Homepage items={items} loadCart={loadCart} />} />
      <Route path="/checkout" element={<Checkout items={items} loadCart={loadCart} />} />
      <Route path="/orders" element={<Orders items={items} loadCart={loadCart} />} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking items={items} />} />
      <Route path="*" element={<NotFound items={items} />} />
    </Routes>
  );
}
export default App;
