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
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

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
    } finally {
      setLoading(false);
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
                {bankData ? "Update Account" : "Add Account"}
              </button>
            </div>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default BankModal;
