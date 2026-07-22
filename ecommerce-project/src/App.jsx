
import {Routes, Route }from 'react-router';
import'./App.css';

import Homepage from './components/HomePage';
function App(){
return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
    </Routes>

);
}
export default App;