import React from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';

// Temp testing obj
const product = {
    name:"Blue Tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price: "3000",
    _id:"abhishek",
}

const Home = () => {
  return (
    <>
    <MetaData title="ECOMMERCE"/>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            <ProductCard key={product._id} product={product} />
            </div>
    </>
  )
}

export default Home