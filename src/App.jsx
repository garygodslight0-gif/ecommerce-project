import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Checkout from "./components/pages/checkout/Checkout";
import Homepage from "./components/pages/home/HomePage";
import Orders from "./components/pages/orders/Orders";
import Tracking from "./components/pages/tracking/Tracking";


function App() {
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
      <Route path="/" element={<Homepage items={items} />} />
      <Route path="/checkout" element={<Checkout items={items} />} />
      <Route path="/orders" element={<Orders items={items} />} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking items={items} />} />
    </Routes>
  );
}
export default App;
