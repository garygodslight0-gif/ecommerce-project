import Header from "../../Header";
import axios from "axios";

import { useEffect, useState } from "react";
import Products from "./Producuts";
function Homepage({ items }) {
  const [products, setProducts] = useState([]);

  useEffect( ()=>{
     const  getProductData = async () => {
   const product = await axios.get("/api/products").then((product) => {
      setProducts(product.data);
    });
    
  }
  getProductData();
}, []);
  return (
    <>
      <Header items={items} />
      <div className="home-page">
        <div className="products-grid">
          <Products products={products} />
        </div>
      </div>
    </>
  );
}
export default Homepage;
