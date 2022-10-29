import { useEffect } from "react";

// context
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";

const Home = () => {
  const { products, dispatchProducts } = useProductsContext();
  const { user, dispatchAuth } = useAuthContext();
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;

      let token;
      if (typeof user === "object") {
        token = user.token;
      } else {
        token = JSON.parse(user).token;
      }

      const res = await fetch(baseUrl + "/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatchProducts({ type: "GET_PRODUCTS", payload: data });
      }
      if (res.status === 401) {
        dispatchAuth({ type: "LOGOUT" });
      }
    };

    fetchProducts();
  }, [dispatchProducts, dispatchAuth, user, baseUrl]);
  return (
    <div className="home">
      <div className="products">
        {products?.map((product) => (
          <ProductDetails key={product._id} product={product} />
        ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
