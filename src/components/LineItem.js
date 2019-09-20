import React from 'react';
import { AppConsumer } from '../providers/AppProvider';

const LineItem = ({
  number,
  name,
  price,
  onSale,
  salePrice,
  qty,
}) => (
  <AppConsumer>
    {({ removeItem }) => (
      <div className="lineitem--container">
        <ul>
          <li>Number: {number}</li>
          <li>Name: {name}</li>
          <li>Price: ${price.toFixed(2)}</li>
          <li className={onSale === false ? 'hide' : 'on-sale'}>{onSale === false ? '' : 'On Sale'}</li>
          <li className={onSale === false ? 'hide' : 'on-sale'}>Sale Price: ${salePrice.toFixed(2)}</li>
          <li>Quantity: {qty}</li>
        </ul>
        <button onClick={() => removeItem(number)}>Remove Item</button>
      </div>
    )}
  </AppConsumer>
);

export default LineItem;
