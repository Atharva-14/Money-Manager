import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Skeleton from "@/components/Skeleton/Skeleton";
import SkeletonTransaction from "@/components/Skeleton/SkeletonTransaction";
import TransactionModal from "@/components/Transaction/TransactionModal";
import { useAuth } from "@/context/AuthContext";
import { formatIndianCurrency } from "@/utils/utils";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconEdit,
  IconPlus,
  IconTransfer,
} from "@tabler/icons-react";
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
    console.log("open modal", transaction);

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
      const sortedTransactions = transArr.sort(
        (a, b) => new Date(b?.transaction_date) - new Date(a?.transaction_date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Unable to fetch transaction: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getBankName = (bank_id) => {
    const bank = banks.find((b) => b.bank_id === bank_id);
    return bank?.bank_name;
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
        updateData={fetchTransactions}
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
        <div className="space-y-2">
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonTransaction />
              <SkeletonTransaction />
              <SkeletonTransaction />
              <SkeletonTransaction />
              <SkeletonTransaction />
            </div>
          ) : transactions.length > 0 ? (
            transactions.map((trans) => (
              <div
                className="flex items-center justify-between"
                key={trans.transaction_id}
              >
                <div className="flex items-center">
                  {trans.transaction_type === "transfer" ? (
                    <IconTransfer className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
                  ) : trans.transaction_type === "expense" ? (
                    <IconArrowUpRight className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
                  ) : (
                    <IconArrowDownLeft className="text-zinc-200 h-14 w-14 p-2 bg-zinc-700 rounded-lg mr-4" />
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-zinc-200 font-medium">
                      Transcation for {trans.description}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Transfer from {getBankName(trans.bank_id)}
                    </p>
                    <p className="text-zinc-400">{trans.transaction_date}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <p className="text-zinc-200 font-mono">
                    {formatIndianCurrency(trans.amount)}
                  </p>
                  <IconEdit
                    className="text-zinc-500 h-6 w-6 hover:text-zinc-300 cursor-pointer"
                    onClick={() => openTransactionModal(trans)}
                  />
                </div>
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
