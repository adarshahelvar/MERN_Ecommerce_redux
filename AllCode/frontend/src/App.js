import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
