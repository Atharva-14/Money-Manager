import { useAuth } from "@/context/AuthContext";
import {
  IconBuildingBank,
  IconCategory,
  IconChartBar,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout,
  IconMoneybag,
  IconTransactionRupee,
} from "@tabler/icons-react";
import Avatar from "boring-avatars";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <motion.nav
      className="flex flex-col justify-between px-4 w-[300px] h-screen bg-[#1f1f1d] flex-shrink-0"
      animate={{ width: open ? "300px" : "60px" }}
    >
      <div>
        <Link
          href="/"
          className="font-bold flex items-center space-x-2 text-xl py-4 text-white"
        >
          <IconMoneybag className={`${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`} />
          <motion.p
            className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            animate={{
              display: open ? "inline-block" : "none",
              opacity: open ? 1 : 0,
            }}
          >
            Money Manager
          </motion.p>
        </Link>

        <div className="flex flex-col space-y-1">
          <h3
            className={
              open ? "text-zinc-500 py-1 text-sm font-medium" : "hidden"
            }
          >
            MENU
          </h3>

          <div
            className={`${
              open
                ? "hidden"
                : "bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full"
            }`}
          />

          <Link
            href="/"
            className="flex items-center justify-start gap-2 group/sidebar py-2"
          >
            <IconChartBar
              className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
            />
            <motion.p
              className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
            >
              Dashboard
            </motion.p>
          </Link>

          <SideBarLink
            open={open}
            link="/"
            label="DashBoard"
            icon={
              <IconChartBar
                className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
              />
            }
          />

          <Link
            href="/transactions"
            className="flex items-center justify-start gap-2 group/sidebar py-2"
          >
            <IconTransactionRupee
              className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
            />
            <motion.p
              className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
            >
              Transaction
            </motion.p>
          </Link>
          <Link
            href="/category"
            className="flex items-center justify-start gap-2 group/sidebar py-2"
          >
            <IconCategory
              className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
            />
            <motion.p
              className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
            >
              Categories
            </motion.p>
          </Link>
          <Link
            href="/bank"
            className="flex items-center justify-start gap-2 group/sidebar py-2"
          >
            <IconBuildingBank
              className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
            />
            <motion.p
              className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
            >
              Banks
            </motion.p>
          </Link>
        </div>

        <div className="flex flex-col space-y-1">
          <h3
            className={
              open ? "text-zinc-500 py-1 text-sm font-medium" : "hidden"
            }
          >
            ACCOUNT
          </h3>

          <div
            className={`${
              open
                ? "hidden"
                : "bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full"
            }`}
          />

          <div className="flex justify-between items-center py-2">
            <Avatar
              name={user?.username}
              variant="beam"
              className="w-10 h-10"
            />
            <motion.div
              className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
            >
              <h3 className="font-semibold text-zinc-300">{user?.username}</h3>
              <p className="text-sm text-zinc-500">{user?.email}</p>
            </motion.div>
            <IconLogout
              className={`${
                open ? "w-6 h-6 text-zinc-300 cursor-pointer" : "hidden"
              }`}
              onClick={logoutUser}
            />
          </div>
        </div>
      </div>

      <div className="flex py-4">
        {open ? (
          <IconLayoutSidebarLeftCollapse
            className="w-6 h-6 text-white cursor-pointer "
            onClick={toggleOpen}
          />
        ) : (
          <IconLayoutSidebarLeftExpand
            className="w-6 h-6 text-white cursor-pointer "
            onClick={toggleOpen}
          />
        )}
      </div>
    </motion.nav>
  );
};

export default Sidebar;

export const SideBarLink = ({ open, label, link, icon }) => {
  return (
    <Link
      href={link}
      className="flex items-center justify-start gap-2 group/sidebar py-2"
    >
      {icon}
      <motion.p
        className="text-zinc-300 text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
      >
        {label}
      </motion.p>
    </Link>
  );
};
