
import {Routes, Route }from 'react-router-dom';
import Homepage from './components/HomePage';
import Checkout from './components/Checkout';
import Oders from './components/Oders';
import Tracking from './components/Tracking';
import'./App.css';

function App(){
return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orders' element={<Oders/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
    </Routes>

);
}
export default App;