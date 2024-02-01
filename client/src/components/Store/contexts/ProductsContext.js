import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArr, setProductsArr] = useState([]);

  const categoriesArr = ["jewelery", "men's clothing", "women's clothing"];

  useEffect(() => {
    
    const fetchProducts = async () => {
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        const productsData = await productsResponse.json();

        setProductsArr(
          productsData.filter((item) => item.category !== "electronics")
        );
    }
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ productsArr, categoriesArr }}>
      {children}
    </ProductsContext.Provider>
  );
};
