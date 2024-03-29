import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product,quantity) => {
    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex] = {
        ...updatedCartItems[existingProductIndex],
        quantity: updatedCartItems[existingProductIndex].quantity + quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      if(product.quantity){
        setCartItems((prevItems) => [...prevItems, product]);
      } else{
        setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
      }
      
    }
  };

  const deleteItem = (product,quantity) => {
    // Find the index of the product in the cart
    const productIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (productIndex !== -1) {
      // If the product is found in the cart
      const updatedCartItems = [...cartItems];
  
      if (updatedCartItems[productIndex].quantity > quantity) {
        // If the quantity is greater than 1, decrease the quantity by 1
        updatedCartItems[productIndex] = {
          ...updatedCartItems[productIndex],
          quantity: updatedCartItems[productIndex].quantity - quantity,
        };
      } else {
        // If the quantity is 1, remove the product from the cart
        updatedCartItems.splice(productIndex, 1);
      }
  
      // Update the cart with the updated items
      setCartItems(updatedCartItems);
    }
  } 

  const clearCart = function(){
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};
