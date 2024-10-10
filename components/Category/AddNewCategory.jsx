import { useRef, useEffect, useState } from "react";
import Input from "../UI/Input";
import Label from "../UI/Label";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const AddNewCategory = ({ open, onClose, onCategoryAdded, categoryData }) => {
  const dialogRef = useRef();
  const { token } = useAuth();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [categoryType, setCategoryType] = useState("expense");
  const [isLoading, setLoading] = useState(false);

  const categoryRef = useRef();

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  useEffect(() => {
    if (categoryData && open) {
      if (categoryRef.current)
        categoryRef.current.value = categoryData?.category_name || "";

      const subCategory = categoryData?.subcategories.map((item) => ({
        id: item.subcategory_id || Date.now(),
        name: item.subcategory_name,
      }));
      setSubcategories(subCategory);

      const type = categoryData?.type_of;
      setCategoryType(type);
    } else {
      if (categoryRef.current) categoryRef.current.value = "";
      setSubcategories([]);
      setCategoryType("expense");
    }
  }, [categoryData, open]);

  const handleAddSubcategory = () => {
    if (subcategoryName.trim()) {
      setSubcategories([
        ...subcategories,
        { id: Date.now(), name: subcategoryName },
      ]);
      setSubcategoryName("");
    }
  };

  const handleSubcategoryChange = (index, newValue) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index].name = newValue;
    setSubcategories(updatedSubcategories);
  };

  const handleRemoveSubcategory = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleTypeChange = (e) => {
    setCategoryType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      category_name: categoryRef.current.value,
      sub_categories: subcategories.map((sub) => sub.name),
      type_of: categoryType,
    };

    try {
      let res;
      if (categoryData) {
        const id = categoryData?.category_id;
        res = await axios.put(
          `https://money-manager-backend-bsdc.onrender.com/api/categories/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            params: { token },
          }
        );
      } else {
        res = await axios.post(
          "https://money-manager-backend-bsdc.onrender.com/api/categories/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            params: { token },
          }
        );
      }

      onCategoryAdded();
      onClose();
      console.log("Response", res);
    } catch (error) {
      console.error("Unable to Add or Update Category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-[#09090b] rounded-lg py-6 md:px-[200px] px-8"
    >
      <h1 className="font-bold text-xl text-white mb-6">
        {categoryData ? "Edit Category" : "Add Category"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <Label>Category Name</Label>
          <Input
            placeholder="Groceries"
            className="mb-6 w-fit bg-[#333333] text-zinc-200"
            ref={categoryRef}
          />
          <p className="text-zinc-400">
            Categories are used to group transactions together. For example, you
            can create a category called 'Groceries' and assign it to all
            transactions related to groceries.
          </p>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Subcategory Name</Label>
          <Input
            placeholder="Weekly Groceries"
            className="mb-2 w-fit bg-[#333333] text-zinc-200"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
          <button
            className="bg-[#333333] text-zinc-200 rounded py-2 px-6 w-fit mb-2"
            onClick={handleAddSubcategory}
            type="button"
          >
            Add Subcategory
          </button>
          <div className="flex flex-col gap-2">
            {subcategories.map((subcategory, index) => (
              <div key={subcategory.id} className="flex items-center gap-2">
                <Input
                  className="w-fit bg-[#333333] text-zinc-200"
                  value={subcategory.name}
                  onChange={(e) =>
                    handleSubcategoryChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-zinc-400 font-bold"
                  onClick={() => handleRemoveSubcategory(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 mt-4">
            Subcategories are used to further categorize transactions within a
            category. For example, you can create a subcategory called 'Weekly
            Groceries' and assign it to transactions related to your weekly
            grocery shopping.
          </p>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Type</Label>
          <div className="mt-2">
            <select
              className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10"
              value={categoryType}
              onChange={handleTypeChange}
            >
              <option className="text-zinc-200" value="expense">
                Expense
              </option>
              <option className="text-zinc-200" value="income">
                Income
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="text-zinc-200 font-medium py-2 px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          {isLoading ? (
            <button
              disabled
              type="button"
              className="text-zinc-200 font-medium py-2 px-4 bg-[#333333] hover:bg-[#1f1f1d] rounded"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </button>
          ) : (
            <div>
              <button
                className="text-zinc-200 font-medium py-2 px-4 bg-[#333333] hover:bg-[#1f1f1d] rounded"
                type="submit"
              >
                {categoryData ? "Update" : "Add"}
              </button>
            </div>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default AddNewCategory;
