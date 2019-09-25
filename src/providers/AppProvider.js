import React, { Component, createContext } from 'react';
import data from '../data/data';

const AppContext = createContext({
  cart: [],
  cartCount: 0,
  subtotal: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartCount: 0,
      subtotal: 0,
      total: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(key) {
    this.setState((prevState) => {
      let cart;

      if (prevState.cart.filter(item => item.number === key).length === 1) {
        cart = prevState.cart.map(item => {
          if (item.number === key) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        cart = [...prevState.cart, { ...data.products.filter(product => product.number === key)[0], qty: 1 }]
      }

      const subtotal = cart.reduce((accum, item) => (accum += item.qty * (item.onSale === true ? item.salePrice : item.price)), 0);

      const cartCount = cart.reduce((accum, item) => (accum +=  item.qty), 0);

      return {
        cart,
        cartCount,
        subtotal,
        total: (subtotal > 0 ? subtotal + data.shipping : 0),
        shipping: (subtotal > 0 ? data.shipping : 0),
      };
    });
  }

  removeItem(key) {
    this.setState((prevState) => {
      const cart = prevState.cart.reduce((accum, item) => {
        if (item.number === key) {
          if (item.qty > 1) {
            item.qty -= 1;
            return [...accum, item];
          }
          return [...accum];
        }
        return [...accum, item];
      }, []);

      const subtotal = cart.reduce((accum, item) => (accum += item.qty * (item.onSale === true ? item.salePrice : item.price)), 0);

      const cartCount = (cart.length > 0 ? cart.reduce((accum, item) => (accum += item.qty), 0) : 0);

      return {
        cart,
        cartCount,
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
