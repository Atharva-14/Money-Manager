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
          <button
            className="text-zinc-200 font-medium py-2 px-4 bg-[#333333] hover:bg-[#1f1f1d] rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddNewCategory;
