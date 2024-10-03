import { useAuth } from "@/context/AuthContext";
import {
  IconBuildingBank,
  IconCategory,
  IconChartBar,
  IconLogout,
  IconTransactionRupee,
} from "@tabler/icons-react";
import Avatar from "boring-avatars";
import Link from "next/link";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="flex flex-col px-4 w-[260px] h-screen bg-[#1f1f1d]">
      <Link href="/" className="font-bold text-xl py-4 text-white">
        Money Manager
      </Link>
      <div className="flex flex-col space-y-1">
        <h3 className="text-zinc-500 py-1 text-sm font-medium">MENU</h3>
        <Link
          href="/"
          className="flex items-center text-lg font-medium py-2 text-zinc-300"
        >
          <IconChartBar className="w-6 h-6 mx-3" />
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className="flex items-center text-lg font-medium py-2 text-zinc-300"
        >
          <IconTransactionRupee className="w-6 h-6 mx-3" />
          Transaction
        </Link>
        <Link
          href="/category"
          className="flex items-center text-lg font-medium py-2 text-zinc-300"
        >
          <IconCategory className="w-6 h-6 mx-3" />
          Categories
        </Link>
        <Link
          href="/bank"
          className="flex items-center text-lg font-medium py-2 text-zinc-300"
        >
          <IconBuildingBank className="w-6 h-6 mx-3" />
          Banks
        </Link>
      </div>
      <div className="flex flex-col space-y-1">
        <h3 className="text-zinc-500 py-1 text-sm font-medium">ACCOUNT</h3>
        <div className="flex justify-between items-center py-2">
          <Avatar name={user?.username} variant="beam" className="w-10 h-10" />
          <div>
            <h3 className="font-semibold text-zinc-300">{user?.username}</h3>
            <p className="text-sm text-zinc-500">{user?.email}</p>
          </div>
          <IconLogout
            className="w-6 h-6 text-zinc-300 cursor-pointer"
            onClick={logoutUser}
          />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
