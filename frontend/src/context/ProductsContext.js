import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      console.log(action);
      return {
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
  });
  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
