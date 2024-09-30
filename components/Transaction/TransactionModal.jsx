import { useEffect, useRef } from "react";
import Label from "../UI/Label";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import bank from "@/pages/bank";

const TransactionModal = ({ open, onClose, banks, categories }) => {
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
      className="bg-[#09090b] rounded-lg w-full py-6 md:px-[200px] px-8"
    >
      <h1 className="font-bold text-2xl text-white mb-6">New Transaction</h1>
      <form>
        <div className="flex flex-col mb-4">
          <Label>Amount</Label>
          <Input
            placeholder="₹0.00"
            className="max-w-xs bg-[#333333] text-zinc-200"
          />
        </div>
        <div className="flex flex-col mb-4">
          <Label>Date</Label>
          <Input
            placeholder="₹0.00"
            type="date"
            className="max-w-xs bg-[#333333] text-zinc-200"
          />
        </div>
        <div className="flex flex-col mb-4">
          <Label>Bank</Label>
          <div className="mt-2">
            <select className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10">
              {banks &&
                banks.map((bank) => (
                  <option
                    className="text-zinc-200"
                    value={bank.bank_name}
                    key={bank.bank_id}
                  >
                    {bank.bank_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Category</Label>
          <div className="mt-2">
            <select className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10">
              {categories &&
                categories.map((category) => (
                  <option
                    className="text-zinc-200"
                    value={category.category_name}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Description</Label>
          <TextArea
            placeholder="Add a description"
            className="mb-6 w-fit bg-[#333333] text-zinc-200"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="text-zinc-200 font-medium py-2 px-4"
            type="button"
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

export default TransactionModal;
