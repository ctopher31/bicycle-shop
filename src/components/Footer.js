import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
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
  </footer>
);

export default Footer;
