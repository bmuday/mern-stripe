import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // context action
  const { dispatchAuth } = useAuthContext();

  const baseUrl = process.env.REACT_APP_SERVER_URL;

  const signup = async (email, password) => {
    setIsLoading(true);

    const res = await fetch(baseUrl + "/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const { ok } = res;

    const data = await res.json();

    if (!ok) {
      setIsLoading(false);
      setError(data.error);
    }

    // if POST request ok
    setMessage(data.message);

    // save the user token to local storage
    localStorage.setItem("user", JSON.stringify(data));

    // update the auth context
    dispatchAuth({ type: "LOGIN/SIGNUP", payload: data });

    setIsLoading(false);
  };

  return { signup, isLoading, error, message };
};
