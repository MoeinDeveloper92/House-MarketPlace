import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">House Market Property</p>
      </header>

      <main>
        {/* Slider will go here */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to={"/category/rent"}>
            <img
              src={rentCategoryImage}
              alt="Rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for Rent</p>
          </Link>
          <Link to={"/category/sell"}>
            <img
              src={sellCategoryImage}
              alt="Rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
