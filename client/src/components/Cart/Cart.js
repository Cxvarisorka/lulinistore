import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart.js";

const trashIcon = <FontAwesomeIcon icon={faTrash} />;
const arrowIcon = <FontAwesomeIcon icon={faArrowLeft} />;

function TrItem({ product, index, addToCart, deleteItem }) {
  return (
    <tr key={index} className="cart-tr">
      <td>
        <div className="td-product">
          <img src={product.image} alt={product.title} />
          <p>
            {product.title.length > 26
              ? product.title.slice(0, 26) + "..."
              : product.title}
          </p>
        </div>
      </td>
      <td>
        <p className="price-td-tb">{product.price}$</p>
      </td>
      <td>
        <div className="quantity-layot">
          <button
            id="math-operation"
            aria-label="Minus one of same product"
            onClick={() => deleteItem(product, 1)}
            className="operation-quant"
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            id="math-operation"
            aria-label="Plus one of same product"
            onClick={() => addToCart(product, 1)}
            className="operation-quant"
          >
            +
          </button>
        </div>
      </td>
      <td>
        <p>{product.quantity * product.price}$</p>
      </td>
      <td>
        <button
          aria-label="Delete product"
          id="delete-product"
          onClick={() => deleteItem(product, product.quantity)}
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
}

function Cart() {
  const { cartItems, addToCart, clearCart, deleteItem } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [promoInput, setPromoInput] = useState("");
  const [promoCodes, setPromoCodes] = useState([
    { code: "lulini2024", discount: 20, usage: 1 },
    { code: "christmas", discount: 10, usage: 1 },
    { code: "luka17", discount: 30, usage: 1 },
    { code: "mari17", discount: 40, usage: 1 },
  ]);
  const itemsPerPage = 4;
  const [totalPrice, setTotalPrice] = useState(0); // Ref for total price calculation
  const totalItems = useRef(0);
  const [placeHolder, setPlaceHolder] = useState("Enter Promo Code");

  // Calculate total price using useRef to persist across re-renders
  totalItems.current = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    // Calculate total price
    const copyTotalPrice = cartItems.reduce((total, item) => {
      return Math.round(total + item.price * item.quantity);
    }, 0);
    setTotalPrice(copyTotalPrice);
  }, [cartItems]);

  const handlePromoInput = function (e) {
    setPromoInput(e.target.value);
  };

  const handlePromoClick = function () {
    const codeIndex = promoCodes.findIndex((el) => el.code === promoInput); // Find index of the promo code
    if (codeIndex !== -1 && promoCodes[codeIndex].usage > 0 && totalPrice > 0) {
      // Check if promo code exists and has usage left
      const updatedPromoCodes = [...promoCodes]; // Create a copy of the promoCodes array
      const discount = updatedPromoCodes[codeIndex].discount;
      const totalPriceAfterDiscount =
        totalPrice - totalPrice * (discount / 100);
      setTotalPrice(Math.round(totalPriceAfterDiscount));
      updatedPromoCodes[codeIndex].usage =
        updatedPromoCodes[codeIndex].usage - 1; // Update the usage of the promo code
      setPromoCodes(updatedPromoCodes); // Update the promoCodes state with the new array
      setPlaceHolder("Enter Promo Code");
    } else {
      setPlaceHolder("Invalid Promo Code Or Total Price is 0");
    }
    setPromoInput("");
  };

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
          <button
            aria-label={"Page " + page}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {cartItems.length === 0 && (
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
          className="empty-cart-message"
        >
          <p>Your cart is empty.</p>
        </div>
      )}
      <div className="order-div">
        <div id="main-order-div">
          <form id="promo-form">
            <div id="promo-div">
              <label>Have a promo code for checkout?</label>
              <div id="promo-div-input">
                <input
                  placeholder={placeHolder}
                  value={promoInput}
                  onChange={handlePromoInput}
                  type="text"
                  id="promo-code"
                />
                <button
                  aria-label="Apply promo code"
                  id="promo-div-apply"
                  type="button"
                  onClick={handlePromoClick}
                >
                  Apply
                </button>
              </div>
            </div>
            <div id="promo-div">
              <label>Add a note to your order.</label>
              <textarea></textarea>
            </div>
            <Link
              aria-label="Back to shopping"
              id="link-to-catalog"
              to="/catalog"
            >
              {arrowIcon} Continue Shopping
            </Link>
          </form>
          <div id="total-info">
            <p id="total-info-title">Order Summary</p>
            <div id="total-items">
              <p>Total:</p>
              <p>{totalItems.current} Item(s)</p>
            </div>
            <div className="hr"></div>
            <div id="total-price">
              <p>TOTAL PRICE</p>
              <p>{totalPrice}$</p>
            </div>
            <div id="total-buttons">
              <button aria-label="Clear whole cart" onClick={clearCart}>
                Clear Cart
              </button>
              <button aria-label="Go To Checkout">Go To Checkout</button>
            </div>
            <p>
              LuliniShop process all orders in USD. Shipping & taxes calculated
              at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
