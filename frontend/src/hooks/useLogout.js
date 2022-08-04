import { useAuthContext } from "./useAuthContext";
import { useProductsContext } from "./useProductsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchProducts } = useProductsContext;

  const logout = () => {
    // remove the user token from local storage
    localStorage.removeItem("user");

    // update the auth context
    dispatch({ type: "LOGOUT" });
    dispatchProducts({ type: "SET_PRODUCTS", payload: null });
  };

  return { logout };
};
