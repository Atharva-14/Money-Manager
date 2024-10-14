import Layout from "@/components/Layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import store from "@/store";

import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  );
}
