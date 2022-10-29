import { useAuthContext } from "./useAuthContext";
import { useProductsContext } from "./useProductsContext";

export const useLogout = () => {
  const { dispatchAuth } = useAuthContext();
  const { dispatchProducts } = useProductsContext();

  const logout = () => {
    // remove the user token from local storage
    localStorage.removeItem("user");

    // update the auth context
    dispatchAuth({ type: "LOGOUT" });
    dispatchProducts({ type: "SET_PRODUCTS", payload: null });
  };

  return { logout };
};
