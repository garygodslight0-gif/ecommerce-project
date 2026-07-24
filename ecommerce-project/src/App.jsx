
import {Routes, Route }from 'react-router';
import Homepage from './components/HomePage';
import'./App.css';

function App(){
return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
    </Routes>

);
}
export default App;