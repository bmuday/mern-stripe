import React from "react";

// context
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetails = ({ product }) => {
  const { _id, name, image_url, list_price, brand, category } = product;

  // context
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    const res = await fetch("/api/products/" + _id, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      // console.log(data);
      dispatch({ type: "DELETE_PRODUCT", payload: data.product });
    } else {
      // error global state
    }
  };
  return (
    <div className="product-details">
      <p>{name}</p>
      <img src={image_url} alt={`${name}`} />
      <div>
        <p>{list_price} $</p>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
        <span onClick={handleClick}>Delete</span>
      </div>
    </div>
  );
};

export default ProductDetails;
