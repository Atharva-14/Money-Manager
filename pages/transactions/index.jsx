import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import TransactionModal from "@/components/Transaction/TransactionModal";
import { useAuth } from "@/context/AuthContext";
import { IconEdit, IconPlus, IconTransfer } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [banks, setBanks] = useState([]);

  const { token } = useAuth();

  const openTransactionModal = (transaction = null) => {
    setModalOpen(true);
  };

  const closeTransactionModal = () => {
    setModalOpen(false);
  };

  const fetchBankAndCategoriesDetails = async () => {
    try {
      const bankResponse = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/bank/`,
        {
          params: {
            token,
          },
        }
      );

      const categoriesResponse = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/categories/`,
        {
          params: {
            token,
          },
        }
      );

      console.log("Banks", bankResponse.data.result);
      setBanks(bankResponse.data.result);
      console.log("Category", categoriesResponse.data.result);
      setCategories(categoriesResponse.data.result);
    } catch (error) {
      console.error("Unable to fetch details", error);
    }
  };

  useEffect(() => {
    fetchBankAndCategoriesDetails();
  }, []);

  return (
    <>
      <TransactionModal
        open={isModalOpen}
        onClose={closeTransactionModal}
        banks={banks}
        categories={categories}
      />
      <div className="w-full h-full flex flex-col bg-[#09090b] py-10 px-[100px]">
        <div className="flex justify-between mb-6">
          <h1 className="font-bold text-2xl text-white p-2">Transactions</h1>
          <button
            className="flex justify-center items-center bg-white rounded-md p-2"
            onClick={() => openTransactionModal()}
          >
            <IconPlus className="h-7 w-7 mr-1" /> Add
          </button>
        </div>
        <div className="flex space-x-2 text-zinc-300 mb-6">
          <button className="bg-zinc-700 py-1 px-3 rounded-lg" type="button">
            Last 30 days
          </button>
          <button className="bg-zinc-700 py-1 px-3 rounded-lg" type="button">
            All Categories
          </button>
          <button className="bg-zinc-700 py-1 px-3 rounded-lg" type="button">
            All Transactions
          </button>
          <button className="bg-zinc-700 py-1 px-3 rounded-lg" type="button">
            Income
          </button>
          <button className="bg-zinc-700 py-1 px-3 rounded-lg" type="button">
            Expense
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
              <div className="flex flex-col">
                <h3 className="text-zinc-200 font-medium">
                  Transfer from State Bank of India
                </h3>
                <p className="text-sm text-zinc-400">
                  Transfer from State Bank of India
                </p>
                <p className="text-sm text-zinc-400">₹1,000 on Sep 28, 2024</p>
              </div>
            </div>
            <IconEdit className="text-zinc-300 h-8 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
              <div className="flex flex-col">
                <h3 className="text-zinc-200 font-medium">
                  Transfer from State Bank of India
                </h3>
                <p className="text-sm text-zinc-400">
                  Transfer from State Bank of India
                </p>
                <p className="text-sm text-zinc-400">₹1,000 on Sep 28, 2024</p>
              </div>
            </div>
            <IconEdit className="text-zinc-300 h-8 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
              <div className="flex flex-col">
                <h3 className="text-zinc-200 font-medium">
                  Transfer from State Bank of India
                </h3>
                <p className="text-sm text-zinc-400">
                  Transfer from State Bank of India
                </p>
                <p className="text-sm text-zinc-400">₹1,000 on Sep 28, 2024</p>
              </div>
            </div>
            <IconEdit className="text-zinc-300 h-8 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
              <div className="flex flex-col">
                <h3 className="text-zinc-200 font-medium">
                  Transfer from State Bank of India
                </h3>
                <p className="text-sm text-zinc-400">
                  Transfer from State Bank of India
                </p>
                <p className="text-sm text-zinc-400">₹1,000 on Sep 28, 2024</p>
              </div>
            </div>
            <IconEdit className="text-zinc-300 h-8 w-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(Transactions);
