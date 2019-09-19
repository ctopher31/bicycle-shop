import React from 'react';
import { AppConsumer } from '../providers/AppProvider';
import Listing from './Listing';

const Shop = () => (
  <AppConsumer>
    {({ products }) => (
      <main className="content shop">
        <h1 className="page--heading">Shop our Products</h1>
        <section className="product--section">
          {products.map(item => <Listing key={item.number} {...item} />)}
        </section>
      </main>
    )}
  </AppConsumer>
);

export default Shop;
