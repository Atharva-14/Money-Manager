import Sidebar from "@/components/UI/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <div className="flex md:flex-row flex-col h-screen w-full">
        {router.pathname !== "/auth" && (
          <div className="md:w-[260px] w-full">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}
