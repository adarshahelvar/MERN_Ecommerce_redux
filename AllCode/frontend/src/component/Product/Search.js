import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useParams, useNavigate,  } from "react-router-dom"; // Import useParams and useNavigate

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate(); // Get the history object using useNavigate

  // Use the useParams hook to get the keyword from the URL
  const { keyword: urlKeyword } = useParams();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Use the history object to navigate
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
