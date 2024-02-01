import React, { useEffect, useState, useContext } from "react";

import { CartContext } from "./contexts/CartContext.js";

import "./Store.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import Spining from "../Spining/Spininig.js";
import useProducts from "../../Hooks/useProducts.js";

const heartIcon = <FontAwesomeIcon icon={faHeart} />;
const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
const eyeIcon = <FontAwesomeIcon icon={faEye} />;
const shopIcon = <FontAwesomeIcon icon={faShoppingCart} />;
const closeIcon = <FontAwesomeIcon icon={faX} />;

function SortBy({ selectedSort, handleSortChange, sortOptions }) {
  return (
    <div>
      <label>Sort By: </label>
      <select value={selectedSort} onChange={handleSortChange}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Categories({ categories, selectedCategory, handleCategoryChange }) {
  return (
    <div>
      <p>Categories: </p>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value="all">All Categories</option>
      </select>
    </div>
  );
}

function Product({ category, image, price, title, addToCart, openPopup }) {
  let formatedTitle;
  if (title.length >= 26) {
    formatedTitle = [...title].filter((chr, i) => i < 26).join("");
    formatedTitle += "...";
  } else {
    formatedTitle = title;
  }

  return (
    <div className="product">
      <div className="top-info">
        <img src={image} alt={title} />
        <div>
          <p>See More</p>
          <button onClick={openPopup}>{eyeIcon}</button>
        </div>
      </div>

      <div className="info">
        <p>{formatedTitle}</p>
        <p>Category: {category}</p>
        <p>Price: {price}$</p>
        <div>
          <button>{heartIcon} Add To Wishlist</button>
          <button onClick={addToCart}>{cartIcon} Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

function Popup({ product, closePopup }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const maxChar = 200;
  let formatedDescription;

  if (product.description.length > maxChar) {
    formatedDescription =
      [...product.description].filter((chr, i) => i <= 200).join("") + "...";
  } else {
    formatedDescription = product.description;
  }

  const handlePlusClick = function () {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinusClick = function () {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closePopup(); // Close the popup after adding to cart
  };

  return (
    <div className="pop-up">
      <img src={product.image} alt={product.title} />
      <div>
        <p id="close-icon" onClick={closePopup}>
          {closeIcon}
        </p>
        <p
          className={`${product.rating.count ? "in-stock" : "out-stock"} stock`}
        >
          In Stock
        </p>
        <p id="product-title">{product.title}</p>
        <p id="product-price">${product.price}</p>
        <p id="product-description">{formatedDescription}</p>
        <div>
          <label>Qty:</label>
          <div className="quantity-layot">
            <p onClick={handleMinusClick} className="operation-quant">
              -
            </p>
            <p>{quantity}</p>
            <p onClick={handlePlusClick} className="operation-quant">
              +
            </p>
          </div>
        </div>

        <button id="product-add" onClick={handleAddToCart}>
          {shopIcon} Add To Cart
        </button>
      </div>
    </div>
  );
}

function Store() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {categoriesArr, productsArr} = useProducts();

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const { addToCart } = useContext(CartContext);

  const sortOptions = [
    { value: "name-asc", label: "Alphabetically, A-Z" },
    { value: "name-desc", label: "Alphabetically, Z-A" },
    { value: "price-asc", label: "Price, low to high" },
    { value: "price-desc", label: "Price, high to low" },
    { value: "rating-asc", label: "Rating, low to high" },
    { value: "rating-desc", label: "Rating, high to low" },
  ];

  // Update filtered products when selected category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(productsArr);
    } else {
      setFilteredProducts(
        productsArr.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, productsArr]);

  // Update sorted products based on selected sort option
  useEffect(() => {
    const sortProducts = () => {
      const sortArr = [...filteredProducts];
      if (selectedSort === "name-asc") {
        sortArr.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedSort === "name-desc") {
        sortArr.sort((a, b) => b.title.localeCompare(a.title));
      } else if (selectedSort === "price-asc") {
        sortArr.sort((a, b) => a.price - b.price);
      } else if (selectedSort === "price-desc") {
        sortArr.sort((a, b) => b.price - a.price);
      } else if (selectedSort === "rating-asc") {
        sortArr.sort((a, b) => a.rating - b.rating);
      } else if (selectedSort === "rating-desc") {
        sortArr.sort((a, b) => b.rating - a.rating);
      }
      setSortedProducts(sortArr);
    };

    sortProducts();
  }, [filteredProducts, selectedSort]);

  // Update products quantity when filtered products change
  useEffect(() => {
    setProductsQuantity(filteredProducts.length);
  }, [filteredProducts]);

  // Calculate current products to display based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when category changes
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when sort changes
  };

  return (
    <div className="mn-store">
      {selectedProduct && (
        <>
          <Popup product={selectedProduct} closePopup={closePopup}></Popup>
          <div className="blur"></div>
        </>
      )}
      <div className="main-store">
        <div className="search-bar">
          <SortBy
            selectedSort={selectedSort}
            handleSortChange={handleSortChange}
            sortOptions={sortOptions}
          />
          <p>Products: {productsQuantity}</p>
          <Categories
            categories={categoriesArr}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        {productsQuantity ? (
          <div className="store">
            {currentProducts.map((product, index) => (
              <Product
                key={index}
                image={product.image}
                category={product.category}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
                addToCart={() => addToCart(product, 1)}
                openPopup={() => openPopup(product, 1)}
              />
            ))}
          </div>
        ) : (
          <Spining />
        )}
        {/* Pagination */}
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(sortedProducts.length / productsPerPage) },
            (_, i) => (
              <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Store;
