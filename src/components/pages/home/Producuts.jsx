

import { useState } from "react";
import Product from "./product" 
useState
function Products ({products ,loadCart }){

    return (<>
      {products.map((product) => (  <Product key={product.id} product={product} loadCart={loadCart} />))}
               
    
    </>)

}
export default Products