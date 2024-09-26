import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // const authToken = localStorage.getItem("authToken") || null;
    const token = Cookies.get("authToken") || null;

    setToken(token);
  }, []);

  const logInUser = async (formData) => {
    try {
      const {
        data: { is_success, result },
      } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        params: {
          email: formData.email,
          password_hash: formData.password_hash,
        },
      });

      const expiresIn = 120 * 60 * 1000;

      if (is_success) {
        setToken(result.token);
        // localStorage.setItem("authToken", JSON.stringify(result.token));

        Cookies.set("authToken", result.token, {
          expires: new Date(new Date().getTime() + expiresIn),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        Cookies.set("tokenExpiresAt", new Date().getTime() + expiresIn, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      return { is_success };
    } catch (error) {
      console.error("Unable to Login", error);
    }
  };

  const signupUser = async (formData) => {
    try {
      const {
        data: { is_success, result },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (is_success) {
        setToken(result.token);
        // localStorage.setItem("authToken", JSON.stringify(result.token));

        Cookies.set("authToken", result.token, {
          expires: new Date(new Date().getTime() + expiresIn),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        Cookies.set("tokenExpiresAt", new Date().getTime() + expiresIn, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      return { is_success };
    } catch (error) {
      console.error("Unable to Signup", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, logInUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
