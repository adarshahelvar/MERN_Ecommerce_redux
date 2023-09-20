import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from './component/Product/Search.js';
import LoginSignup from "./component/User/LoginSignUp";

function App() {
  // This use effect is running to change font style and import font families
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSignup} />
        <Route path="/products/:keyword" component={Products} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
