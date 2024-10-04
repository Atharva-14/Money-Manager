import { useEffect, useRef, useState } from "react";
import Label from "../UI/Label";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const TransactionModal = ({
  open,
  onClose,
  banks,
  categories,
  trasactionData,
}) => {
  const { token } = useAuth();
  const dialogRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const [bankType, setBankType] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

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
    if (trasactionData && open) {
      // Handle prefilling the form with transactionData if needed
    }
  }, [trasactionData, open]);

  const handleBankChange = (e) => {
    const selectedBankId = e.target.value;
    setBankType(selectedBankId);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryType(selectedCategoryId);
  };

  const handleTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      amount: amountRef.current.value,
      transaction_type: transactionType,
      transaction_date: dateRef.current.value,
      description: descriptionRef.current.value,
      bank_id: bankType,
      category_id: categoryType,
      subcategory_id: 0,
    };

    console.log("FormData", formData);

    let res;

    try {
      res = await axios.post(
        `https://money-manager-backend-bsdc.onrender.com/api/transactions/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: { token },
        }
      );
      console.log("Transcation Response", res);

      onClose();
    } catch (error) {
      console.error("Unable to Add Transaction", error.message);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-[#09090b] rounded-lg w-full py-6 md:px-[200px] px-8"
    >
      <h1 className="font-bold text-2xl text-white mb-6">New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <Label>Amount</Label>
          <Input
            ref={amountRef}
            placeholder="₹0.00"
            className="max-w-xs bg-[#333333] text-zinc-200"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <Label>Date</Label>
          <Input
            ref={dateRef}
            placeholder="₹0.00"
            type="date"
            className="max-w-xs bg-[#333333] text-zinc-200"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <Label>Type</Label>
          <div className="mt-2">
            <select
              className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10"
              value={transactionType}
              onChange={handleTypeChange}
              required
            >
              <option className="text-zinc-200" value="expense">
                Expense
              </option>
              <option className="text-zinc-200" value="income">
                Income
              </option>
              <option className="text-zinc-200" value="transfer">
                Transfer
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Bank</Label>
          <div className="mt-2">
            <select
              className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10"
              value={bankType}
              onChange={handleBankChange}
              required
            >
              <option value="" disabled>
                Select Bank
              </option>
              {banks &&
                banks.map((bank) => (
                  <option
                    className="text-zinc-200"
                    value={bank.bank_id}
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
            <select
              className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10"
              value={categoryType}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option
                    className="text-zinc-200"
                    value={category.category_id}
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
            ref={descriptionRef}
            placeholder="Add a description"
            className="mb-6 w-fit bg-[#333333] text-zinc-200"
            required
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
