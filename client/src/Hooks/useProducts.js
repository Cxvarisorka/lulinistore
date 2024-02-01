import { useContext } from "react";
import { ProductsContext } from "../components/Store/contexts/ProductsContext";

const useProducts = function () {
  return useContext(ProductsContext);
};

export default useProducts;
