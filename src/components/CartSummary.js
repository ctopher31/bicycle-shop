import React from 'react';
import { AppConsumer } from '../providers/AppProvider';

const CartSummary = () => (
  <AppConsumer>
    {({ shipping, subtotal, total }) => (
      <div className="cart--summary">
        <h2>Summary</h2>
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Shipping: ${shipping.toFixed(2)}</div>
        <hr />
        <div>Total: ${total.toFixed(2)}</div>
      </div>
    )}
  </AppConsumer>
);

export default CartSummary;
