import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = Cookies.get("authToken") || null;
    const userinfo = Cookies.get("authUser") || null;

    let u = null;
    if (userinfo) {
      u = JSON.parse(userinfo);
    }

    setUser(u);
    setToken(token);
  }, []);

  const logInUser = async (formData) => {
    try {
      const {
        data: { is_success, result },
      } = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/user/login`,
        {
          params: {
            email: formData.email,
            password_hash: formData.password_hash,
          },
        }
      );

      const expiresIn = 120 * 60 * 1000;

      if (is_success) {
        setToken(result.token);
        const userObj = {
          email: result.email,
          username: result.username,
        };
        setUser(userObj);

        Cookies.set("authToken", result.token, {
          expires: new Date(new Date().getTime() + expiresIn),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        Cookies.set("authUser", JSON.stringify(userObj), {
          expires: new Date(new Date().getTime() + expiresIn),
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
        `https://money-manager-backend-bsdc.onrender.com/api/user/create`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (is_success) {
        setToken(result.token);
        const userObj = {
          email: result.email,
          username: result.username,
        };
        setUser(userObj);

        Cookies.set("authToken", result.token, {
          expires: new Date(new Date().getTime() + expiresIn),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        Cookies.set("authUser", JSON.stringify(userObj), {
          expires: new Date(new Date().getTime() + expiresIn),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      return { is_success };
    } catch (error) {
      console.error("Unable to Signup", error);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);

    Cookies.remove("authToken");
    Cookies.remove("authUser");

    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, logInUser, signupUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
