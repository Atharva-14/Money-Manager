import Sidebar from "@/components/UI/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full">
      {router.pathname !== "/auth" && (
        <div className="w-64 bg-gray-200">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    </div>
  );
}
