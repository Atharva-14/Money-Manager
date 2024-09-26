import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    const { token } = useAuth();
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (!isLoading && router.isReady) {
        if (!token) {
          router.push("/auth");
        }
      }
    }, [token, isLoading, router.isReady]);

    if (isLoading || !router.isReady) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;
