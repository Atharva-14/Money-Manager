import { useAuth } from "@/context/AuthContext";
import Sidebar from "../UI/Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col md:flex-row w-full flex-1 overflow-hidden">
      {router.pathname !== "/auth" && <Sidebar />}
      <div className="flex flex-1 overflow-auto bg-[#09090b]">
        <div className="overflow-auto flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
