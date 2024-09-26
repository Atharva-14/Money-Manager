import Login from "@/components/UI/Login";
import Signup from "@/components/UI/Signup";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen bg-[#09090b] flex flex-col ">
      <h1 className="p-4 text-white font-bold text-2xl">Money Manager</h1>

      <div className="bg-gradient-to-tr from-transparent via-neutral-700 my-2 h-[1px] w-full" />

      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex space-x-4 mb-4 max-w-md w-full mx-auto rounded-md px-3 py-2 shadow-input bg-[#27272a]">
          <button
            className={`px-7 py-1 text-white rounded-md w-full ${
              activeTab === "login" ? "bg-[#09090b]" : ""
            }`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
          <button
            className={`px-7 py-1 text-white rounded-md w-full ${
              activeTab === "signup" ? "bg-[#09090b]" : ""
            }`}
            onClick={() => handleTabClick("signup")}
          >
            Signup
          </button>
        </div>
        <div className="max-w-md w-full mx-auto rounded-md p-4 md:p-8 shadow-input bg-[#09090b] border border-zinc-700">
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}
