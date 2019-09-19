import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import AppProvider from './providers/AppProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './components/Shop';
import Cart from './components/Cart';

const App = () => (
  <AppProvider>
    <Router>
      <Header />

      <Route exact path="/" component={Shop} />
      <Route path="/cart" component={Cart} />

      <Footer />
    </Router>
  </AppProvider>
);

export default App;
