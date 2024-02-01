import { useContext } from "react";
import { CartContext } from "../components/Store/contexts/CartContext.js";

const useCart = function () {
  return useContext(CartContext);
};

export default useCart;
