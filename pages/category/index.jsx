import AddNewCategory from "@/components/Category/AddNewCategory";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Category = () => {
  const [activeTab, setActiveTab] = useState("expense");
  const { token } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/categeroies/`,
        {
          params: {
            token,
          },
        }
      );

      console.log("Category Response", res.data);
    } catch (error) {
      console.log("Failed to fetch Categories", error);
    }
  };

  const openCategoryModal = () => setModalOpen(true);

  const closeCategoryModal = () => setModalOpen(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <AddNewCategory open={isModalOpen} onClose={closeCategoryModal} />
      <div className="w-full h-full flex flex-col bg-[#09090b] py-10 px-[100px]">
        <h1 className="font-bold text-2xl mb-6 text-white">Categories</h1>
        <div className="flex space-x-4 border-b border-b-gray-600">
          <button
            className={`font-semibold p-2 text-white ${
              activeTab === "expense" ? "border-b-2" : ""
            }`}
            onClick={() => handleTabClick("expense")}
          >
            Expense
          </button>
          <button
            className={`font-semibold p-2 text-white ${
              activeTab === "income" ? "border-b-2" : ""
            }`}
            onClick={() => handleTabClick("income")}
          >
            Income
          </button>
        </div>
        <div className="py-3">
          <div className="p-2">
            <h2 className="text-white font-semibold">Title</h2>
            <p className="text-gray-300 text-sm">Description</p>
          </div>
          <div className="p-2">
            <h2 className="text-white font-semibold">Title</h2>
            <p className="text-gray-300 text-sm">Description</p>
          </div>
          <div className="p-2">
            <h2 className="text-white font-semibold">Title</h2>
            <p className="text-gray-300 text-sm">Description</p>
          </div>
        </div>
        <div className="border-dashed border-zinc-700 rounded border-2 flex flex-col space-y-4 justify-center items-center py-10">
          <h3 className="text-white font-semibold">Add a new category</h3>
          <button
            className="text-white py-2 px-4 rounded bg-zinc-800"
            onClick={openCategoryModal}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(Category);
