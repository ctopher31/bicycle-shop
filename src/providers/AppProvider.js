import React, { Component, createContext } from 'react';
import products from '../data/data';

const AppContext = createContext({
  cart: [],
  subtotal: 0,
  total: 0,
  shipping: 0,
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
      shipping: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(key) {
    this.setState((prevState) => {
      const cart = [ ...prevState.cart, { ...products.filter(item => item.number === key) }];
      const subtotal = cart.reduce((accum, item) => {
        return accum += (item.qty * (item.onSale === true ? item.salePrice : item.price));
      }, 0);
      
      return {
        cart,
        subtotal,
        total: (subtotal > 0 ? subtotal + prevState.shipping : 0),
        shipping: (subtotal > 0 ? prevState.shipping : 0),
      };
    });
  }

  removeItem(key) {
    this.setState((prevState) => {
      const cart = prevState.cart.filter(item => item.number !== key);
      const subtotal = cart.reduce((accum, item) => {
        return accum += (item.qty * (item.onSale === true ? item.salePrice : item.price));
      }, 0);

      return {
        cart,
        subtotal,
        total: (subtotal > 0 ? subtotal + prevState.shipping : 0),
        shipping: (subtotal > 0 ? prevState.shipping : 0),
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
          products: products,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
