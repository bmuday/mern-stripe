import React from "react";

// context
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetails = ({ product }) => {
  const { _id, name, image_url, list_price, brand, category } = product;
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  // context
  const { dispatchProducts } = useProductsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    let token;
    if (typeof user === "object") {
      token = user.token;
    } else {
      token = JSON.parse(user).token;
    }

    try {
      const res = await fetch(baseUrl + "/api/products/" + _id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        dispatchProducts({ type: "DELETE_PRODUCT", payload: data.product });
      }
    } catch (err) {}
  };
  return (
    <div className="product-details">
      <p>{name}</p>
      <img src={image_url} alt={`${name}`} />
      <div>
        <p>{list_price} $</p>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
        <span onClick={handleDelete}>Delete</span>
      </div>
    </div>
  );
};

export default ProductDetails;
