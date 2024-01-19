import React, { useContext, useState } from "react";
import { CartContext } from "../Store/CartContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './Cart.css';

const trashIcon = <FontAwesomeIcon icon={faTrash} />;

function TrItem({ product, index, addToCart, deleteItem }) {
  return (
    <tr key={index} className="cart-tr">
      <td>
        <div className="td-product">
          <img src={product.image} alt={product.title} />
          <p>{product.title.length > 26 ? product.title.slice(0, 26) + '...' : product.title}</p>
        </div>
      </td>
      <td>
        <p className="price-td-tb">{product.price}$</p>
      </td>
      <td>
        <div className="quantity-layot">
          <p onClick={() => deleteItem(product)} className="operation-quant">-</p>
          <p>{product.quantity}</p>
          <p onClick={() => addToCart(product)} className="operation-quant">+</p>
        </div>
      </td>
      <td>
        <p>{product.quantity * product.price}$</p>
      </td>
      <td>
        <p style={{ cursor: 'pointer' }} onClick={() => deleteItem(product)}>{trashIcon}</p>
      </td>
    </tr>
  );
}

function Cart() {
    const { cartItems, addToCart, clearCart, deleteItem } = useContext(CartContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
  
    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  
    function handlePageChange(pageNumber) {
      setCurrentPage(pageNumber);
    }
  
    // Check if the current page is empty and automatically switch to the first page
    if (currentPage > 1 && currentItems.length === 0) {
      setCurrentPage(1);
    }

  return (
    <div className="cart-page">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((elem, i) => (
            <TrItem
              key={i}
              product={elem}
              deleteItem={deleteItem}
              addToCart={addToCart}
              index={i}
            />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
      {cartItems.length === 0 && (
        <div style={{width: '100%', height:'400px', display:'flex', textAlign:'center',justifyContent:'center'}} className="empty-cart-message">
          <p>Your cart is empty.</p>
        </div>
      )}
      <div className="order-div">
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Cart;
