import AddNewCategory from "@/components/Category/AddNewCategory";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import SkeletonCategory from "@/components/Skeleton/SkeletonCategory";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Category = () => {
  const [activeTab, setActiveTab] = useState("expense");
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/categories/`,
        {
          params: {
            token,
          },
        }
      );

      const categories = res.data.result;

      const expenseCategories = categories.filter(
        (category) => category.type_of === "expense"
      );

      const incomeCategories = categories.filter(
        (category) => category.type_of === "income"
      );

      setExpenses(expenseCategories);
      setIncomes(incomeCategories);
    } catch (error) {
      console.log("Failed to fetch Categories", error);
    } finally {
      setLoading(false);
    }
  };

  const openCategoryModal = (category = null) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const closeCategoryModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const displayedCategories = activeTab === "expense" ? expenses : incomes;

  console.log(displayedCategories);

  return (
    <>
      <AddNewCategory
        open={isModalOpen}
        onClose={closeCategoryModal}
        onCategoryAdded={getCategories}
        categoryData={selectedCategory}
      />
      <div className=" min-h-max flex flex-col py-10 px-[100px]">
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
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonCategory />
              <SkeletonCategory />
              <SkeletonCategory />
              <SkeletonCategory />
            </div>
          ) : displayedCategories.length > 0 ? (
            displayedCategories.map((item) => (
              <div
                className="p-2 hover:bg-zinc-800 hover:rounded-md cursor-pointer"
                key={item.category_id}
                onClick={() => openCategoryModal(item)}
              >
                <h2 className="text-white font-semibold">
                  {item.category_name}
                </h2>
                <div className="flex space-x-2 text-gray-300 text-sm">
                  {item.subcategories.map((i) => (
                    <p className="bg-zinc-700 py-1 px-3 rounded-2xl" key={i.id}>
                      {i.subcategory_name}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No categories found.</p>
          )}
        </div>
        <div className="border-dashed border-zinc-700 rounded border-2 flex flex-col space-y-4 justify-center items-center py-10">
          <h3 className="text-white font-semibold">Add a new category</h3>
          <button
            className="text-white py-2 px-4 rounded bg-zinc-800"
            onClick={() => openCategoryModal()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(Category);
