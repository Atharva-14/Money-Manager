import Layout from "@/components/Layout/Layout";
import Sidebar from "@/components/UI/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
