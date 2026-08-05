
import {Routes, Route }from 'react-router-dom';
import Homepage from './components/HomePage';
import Checkout from './components/Checkout';
import Oders from './components/Oders';
import Tracking from './components/Tracking';
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
        <Route path='/orders' element={<Oders items={items}/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
    </Routes>

);
}
export default App;