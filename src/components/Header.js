import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="brand--container">
      Bicycle Shop
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li className="cart--link">
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
