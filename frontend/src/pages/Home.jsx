import { useEffect } from "react";

// context
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      const { token } = JSON.parse(user);
      console.log("token", token);
      const res = await fetch(baseUrl + "/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        // console.log(data);
        dispatch({ type: "GET_PRODUCTS", payload: data });
      }
    };

    fetchProducts();
  }, [dispatch, user]);
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
