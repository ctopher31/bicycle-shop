import React from 'react';
import { AppConsumer } from '../providers/AppProvider';

const Shop = () => (
  <AppConsumer>
    {({ products }) => (
      <main className="content shop">
        Shop
      </main>
    )}
  </AppConsumer>
);

export default Shop;
