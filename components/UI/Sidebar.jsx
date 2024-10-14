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

  const menuLink = [
    {
      link: "/",
      label: "Dashboard",
      icon: (
        <IconChartBar
          className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
        />
      ),
    },
    {
      link: "/transactions",
      label: "Transaction",
      icon: (
        <IconTransactionRupee
          className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
        />
      ),
    },
    {
      link: "/category",
      label: "Categories",
      icon: (
        <IconCategory
          className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
        />
      ),
    },
    {
      link: "/bank",
      label: "Banks",
      icon: (
        <IconBuildingBank
          className={`text-zinc-300 ${open ? "w-6 h-6 mx-3" : "w-8 h-8"}`}
        />
      ),
    },
  ];

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
          {menuLink.map((item, index) => (
            <div key={index}>
              <SideBarLink
                open={open}
                link={item.link}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
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
  const [showTooltip, setShowTooltip] = useState();
  return (
    <div
      className="flex items-center relative"
      onMouseLeave={() => setShowTooltip(false)}
      onMouseEnter={() => setShowTooltip(true)}
    >
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

      {!open && showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: showTooltip ? 1 : 0,
            x: showTooltip ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded shadow-lg"
        >
          {label}
        </motion.div>
      )}
    </div>
  );
};
