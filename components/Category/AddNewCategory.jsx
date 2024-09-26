import Input from "../UI/Input";
import Label from "../UI/Label";

const { useRef, useEffect } = require("react");

const AddNewCategory = ({ open, onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-[#09090b] rounded-lg py-6 md:px-[200px] px-8"
    >
      <h1 className="font-bold text-xl text-white mb-6">Add Category</h1>
      <div className="flex flex-col mb-4">
        <Label>Category Name</Label>
        <Input
          placeholder="Groceries"
          className="mb-6 w-fit bg-[#333333] text-zinc-200"
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
          placeholder="Groceries"
          className="mb-6 w-fit bg-[#333333] text-zinc-200"
        />
        <p className="text-zinc-400 mb-2">
          Subcategories are used to further categorize transactions within a
          category. For example, you can create a subcategory called 'Weekly
          Groceries' and assign it to transactions related to your weekly
          grocery shopping.
        </p>
        <button className="bg-[#333333] text-zinc-200 rounded py-2 px-6 w-fit">
          Add Subcategory
        </button>
      </div>
      <div className="flex flex-col mb-4">
        <Label>Type</Label>
        <div className="mt-2">
          <select className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10">
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
        <button className="text-zinc-200 font-medium py-2 px-4 bg-[#333333] rounded">
          Save
        </button>
      </div>
    </dialog>
  );
};

export default AddNewCategory;
