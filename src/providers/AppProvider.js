import React, { Component, createContext } from 'react';
import data from '../data/data';

const AppContext = createContext({
  cart: [],
  subtotal: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      subtotal: 0,
      total: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(key) {
    this.setState((prevState) => {
      const cart = [...prevState.cart, ...data.products.filter(item => item.number === key)];
      const subtotal = cart.reduce((accum, item) => {
        return accum += (item.onSale === true ? item.salePrice : item.price);
      }, 0);
      
      return {
        cart,
        subtotal,
        total: (subtotal > 0 ? subtotal + data.shipping : 0),
        shipping: (subtotal > 0 ? data.shipping : 0),
      };
    });
  }

  removeItem(key) {
    this.setState((prevState) => {
      const cart = prevState.cart.filter(item => item.number !== key);
      const subtotal = cart.reduce((accum, item) => {
        return accum += (item.onSale === true ? item.salePrice : item.price);
      }, 0);

      return {
        cart,
        subtotal,
        total: (subtotal > 0 ? subtotal + data.shipping : 0),
        shipping: (subtotal > 0 ? data.shipping : 0),
      };
    });
  }

  render() {
    return (
      <AppContext.Provider
        value={{ 
          ...this.state,
          addItem: this.addItem,
          removeItem: this.removeItem,
          products: data.products,
          shipping: data.shipping,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
