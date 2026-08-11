
import {Routes, Route }from 'react-router-dom';
import Homepage from './components/pages/home/HomePage';
import Checkout from './components/pages/checkout/Checkout';
import Orders from './components/pages/orders/Orders';
import Tracking from './components/pages/tracking/Tracking';
import'./App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App(){
     const[items, setItems] = useState([]);
     useEffect(() => {
        axios.get("/api/cart-items?expand=product").then((response)=>{setItems(response.data)})
     }, [])
return (
    <Routes>
        <Route path='/' element={<Homepage items={items}/>}/>
        <Route path='/checkout' element={<Checkout items={items}/>}/>
        <Route path='/orders' element={<Orders items={items}/>}/>
        <Route path='/tracking' element={<Tracking items={items}/>}/>
    </Routes>

);
}
export default App; 