import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN/SIGNUP":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch({ type: "LOGIN/SIGNUP", payload: user });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatchAuth: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
