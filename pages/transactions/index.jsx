import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { IconEdit, IconPlus, IconTransfer } from "@tabler/icons-react";

const Transactions = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#09090b] py-10 px-[100px]">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl text-white p-2">Transactions</h1>
        <button className="flex justify-center items-center bg-white rounded-md p-2">
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
  );
};

export default PrivateRoute(Transactions);
