import { useEffect, useRef, useState } from "react";
import Label from "../UI/Label";
import Input from "../UI/Input";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const BankModal = ({ open, onClose, bankData, fetchBank }) => {
  const { token } = useAuth();
  const dialogRef = useRef();
  const bankNameRef = useRef();
  const totalBalanceRef = useRef();

  const [accountType, setAccountType] = useState("current");

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
    if (bankData && open) {
      if (bankNameRef.current)
        bankNameRef.current.value = bankData?.bank_name || "";

      const accType = bankData?.account_type;
      setAccountType(accType);

      if (totalBalanceRef.current)
        totalBalanceRef.current.value = bankData?.total_balance || "";
    } else {
      if (bankNameRef.current) bankNameRef.current.value = "";

      setAccountType("current");

      if (totalBalanceRef.current) totalBalanceRef.current.value = "";
    }
  }, [bankData, open]);

  const handleTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      bank_name: bankNameRef.current.value,
      account_type: accountType,
      total_balance: totalBalanceRef.current.value,
    };

    try {
      if (bankData) {
        const id = bankData?.bank_id;

        const res = await axios.put(
          `https://money-manager-backend-bsdc.onrender.com/api/bank/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            params: {
              token,
            },
          }
        );

        if (res.data.is_success) {
          bankNameRef.current.value = "";
          totalBalanceRef.current.value = "";
          fetchBank();
          onClose();
        }
      } else {
        const res = await axios.post(
          `https://money-manager-backend-bsdc.onrender.com/api/bank/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            params: {
              token,
            },
          }
        );

        if (res.data.is_success) {
          bankNameRef.current.value = "";
          totalBalanceRef.current.value = "";
          fetchBank();
          onClose();
        }
      }
    } catch (error) {
      console.error("Unable to create bank", error.message);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-[#09090b] rounded-lg w-full py-6 md:px-[200px] px-8"
    >
      <h1 className="font-bold text-2xl text-white mb-6">
        Link a bank account
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <Label>Bank Name</Label>
          <Input
            placeholder="Bank Name"
            type="text"
            ref={bankNameRef}
            className="max-w-xs bg-[#333333] text-zinc-200"
          />
        </div>
        <div className="mb-4">
          <select
            className="rounded bg-[#333333] text-zinc-200 font-medium py-2 px-10"
            value={accountType}
            onChange={handleTypeChange}
          >
            <option className="text-zinc-200" value="current">
              Current
            </option>
            <option className="text-zinc-200" value="savings">
              Savings
            </option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <Label>Total Balance</Label>
          <Input
            ref={totalBalanceRef}
            placeholder="₹ 0.00"
            type="number"
            className="max-w-xs bg-[#333333] text-zinc-200"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-zinc-200 font-medium py-2 px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-zinc-200 font-medium py-2 px-4 bg-[#333333] hover:bg-[#1f1f1d] rounded"
            type="submit"
          >
            {bankData ? "Update Account" : "Add Account"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default BankModal;
