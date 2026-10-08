import Header from "../../Header";
import axios from "axios";
import { useSearchParams } from "react-router";
import { useEffect, useState ,} from "react";
import Products from "./Producuts";
function Homepage({ items , loadCart }) {
  const [products, setProducts] = useState([]);
const [searchParams] = useSearchParams();
const search = searchParams.get("search") || "";
  useEffect( ()=>{
    
     const  getProductData = async () => {
   const product = search ? await axios.get(`/api/products?search=${search}`) :  await axios.get("/api/products")
       
    setProducts(product.data);
    
  } 
  getProductData();
}, [search]);
  return (
    <>
      <Header items={items} />
      <div className="home-page">
        <div className="products-grid">
          <Products products={products} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
export default Homepage;
