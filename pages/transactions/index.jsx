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
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { token } = useAuth();

  const openTransactionModal = (transaction = null) => {
    setSelectedTransaction(transaction);
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

  const fetchTransactions = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/transactions/`,
        {
          params: {
            token,
          },
        }
      );
      const transArr = res.data.result;
      console.log("Transactions: ", transArr);
      setTransactions(transArr);
    } catch (error) {
      console.error("Unable to fetch transaction: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBankAndCategoriesDetails();
  }, []);

  return (
    <>
      <TransactionModal
        open={isModalOpen}
        onClose={closeTransactionModal}
        banks={banks}
        categories={categories}
        transactionData={selectedTransaction}
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
          {isLoading ? (
            <p>Loading</p>
          ) : transactions.length > 0 ? (
            transactions.map((trans) => (
              <div className="flex items-center justify-between" key={trans.id}>
                <div className="flex">
                  <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
                  <div className="flex flex-col">
                    <h3 className="text-zinc-200 font-medium">
                      Transfer from State Bank of India
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Transfer from State Bank of India
                    </p>
                    <p className="text-sm text-zinc-400">
                      ₹1,000 on Sep 28, 2024
                    </p>
                  </div>
                </div>
                <IconEdit className="text-zinc-500 h-6 w-6 hover:text-zinc-300 cursor-pointer" />
              </div>
            ))
          ) : (
            <p className="text-zinc-400 font-bold text-2xl mt-2">
              No Transactions. Please add some.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(Transactions);
