import { useState } from "react";

// context
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // context
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const baseUrl = "http://localhost:5000";

  const clearError = () => {
    setTimeout(() => {
      setEmptyFields([]);
      setError(null);
    }, 2000);
  };

  const clearSuccess = () => {
    setName("");
    setPrice(0);
    setBrand("");
    setCategory("");
    setError(null);
    setEmptyFields([]);

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    const { token } = JSON.parse(user);
    const product = { name, list_price: price, brand, category };
    // console.log("product", product);

    const res = await fetch(baseUrl + "/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { ok } = res;
    const data = await res.json();
    // console.log(data);

    if (!ok) {
      setEmptyFields(data.emptyFields);
      setError(data.error);
      clearError();
    }

    dispatch({ type: "CREATE_PRODUCT", payload: data.product });
    setMessage(data.message);
    clearSuccess();
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Product</h3>
      <div>
        <label>Enter a name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </div>
      <div>
        <label>Enter a price</label>
        <input
          type="number"
          value={price}
          min="0.00"
          step="1"
          onChange={(e) => setPrice(e.target.value)}
          className={emptyFields.includes("list_price") ? "error" : ""}
        />
      </div>
      <div>
        <label>Enter a brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={emptyFields.includes("brand") ? "error" : ""}
        />
        <label>Enter a category :</label>
      </div>
      <select
        defaultValue="default"
        onChange={(e) => setCategory(e.target.value)}
        className={emptyFields.includes("category") ? "error" : ""}
      >
        <option value="default">Choose a category</option>
        <option value="clothes">Clothes</option>
        <option value="cooking">Cooking</option>
        <option value="music">Music</option>
      </select>
      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default ProductForm;
