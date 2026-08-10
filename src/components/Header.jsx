
import {  NavLink } from "react-router-dom"
import LogoWhite from "../assets/images/logo-white.png"
import Logo from "../assets/images/logo.png"
import SearchIcon from "../assets/images/icons/search-icon.png"  
import Cart from "../assets/images/icons/cart-icon.png"

function Header({ items }) {
  let totalQuantity = 0;
  items.forEach((item) => {
    totalQuantity += item.quantity
  })

    return(
        <>
         <div className="header">
      <div className="left-section">
        <NavLink to ="/" className="header-link">

          <img className="logo"
            src={Logo} />
          <img className="mobile-logo"
            src={LogoWhite} />

        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to ="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to ="/checkout">
          <img className="cart-icon" src={Cart} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>

        </>
    )
}
export default Header