import React, { useEffect, useState, useContext } from "react";

import { CartContext } from "./CartContext.js";

import './Store.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Spining from "../Spining/Spininig.js";

const heartIcon = <FontAwesomeIcon icon={faHeart} />;
const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;

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

function Product({ category, description, image, price, rating, title, addToCart }) {
  let formatedTitle;
  if (title.length >= 26) {
    formatedTitle = [...title].filter((chr, i) => i < 26).join('');
    formatedTitle += '...'
  } else {
    formatedTitle = title;
  }
  return (
    <div className="product">
      <img src={image} alt={title} />
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
  )
}

function Store() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page

  const { addToCart } = useContext(CartContext);

  const sortOptions = [
    { value: 'name-asc', label: 'Alphabetically, A-Z' },
    { value: 'name-desc', label: 'Alphabetically, Z-A' },
    { value: 'price-asc', label: 'Price, low to high' },
    { value: 'price-desc', label: 'Price, high to low' },
    { value: 'rating-asc', label: 'Rating, low to high' },
    { value: 'rating-desc', label: 'Rating, high to low' },
  ];

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await fetch('https://fakestoreapi.com/products');
      const productsData = await productsResponse.json();

      const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');
      const categoriesData = await categoriesResponse.json();

      setProducts(productsData.filter((item) => item.category !== 'electronics'));
      setCategories(categoriesData.filter((_, index) => index !== 0));
    };

    fetchData();
  }, []);

  // Update filtered products when selected category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Update sorted products based on selected sort option
  useEffect(() => {
    const sortProducts = () => {
      const sortArr = [...filteredProducts];
      if (selectedSort === 'name-asc') {
        sortArr.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedSort === 'name-desc') {
        sortArr.sort((a, b) => b.title.localeCompare(a.title));
      } else if (selectedSort === 'price-asc') {
        sortArr.sort((a, b) => a.price - b.price);
      } else if (selectedSort === 'price-desc') {
        sortArr.sort((a, b) => b.price - a.price);
      } else if (selectedSort === 'rating-asc') {
        sortArr.sort((a, b) => a.rating - b.rating);
      } else if (selectedSort === 'rating-desc') {
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
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
    <div>
      <div className="main-store">
        <div className="search-bar">
          <SortBy
            selectedSort={selectedSort}
            handleSortChange={handleSortChange}
            sortOptions={sortOptions}
          />
          <p>Products: {productsQuantity}</p>
          <Categories
            categories={categories}
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
                addToCart={() => addToCart(product)}
              />
            ))}
          </div>
        ) : (
          <Spining />
        )}
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
            <li key={i} className={currentPage === i + 1 ? "active" : ""}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Store;
