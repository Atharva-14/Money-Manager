import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { IconBrandVisa } from "@tabler/icons-react";

const Bank = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#09090b] py-10 px-[150px]">
      <h1 className="font-bold text-2xl text-white mb-6">Bank</h1>

      <div>
        <h2 className="font-semibold text-white mb-6">Connected Accounts</h2>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <IconBrandVisa className="text-zinc-800 rounded h-10 w-12 bg-white" />
              <div className="">
                <p className="text-zinc-200">State Bank of India</p>
                <p className="text-zinc-400">
                  **** &middot;&middot;&middot;&middot; 1234
                </p>
              </div>
            </div>
            <p className="text-zinc-200 font-semibold">₹12,345</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <IconBrandVisa className="text-zinc-800 rounded h-10 w-12 bg-white" />
              <div className="">
                <p className="text-zinc-200">State Bank of India</p>
                <p className="text-zinc-400">
                  **** &middot;&middot;&middot;&middot; 1234
                </p>
              </div>
            </div>
            <p className="text-zinc-200 font-semibold">₹12,345</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <IconBrandVisa className="text-zinc-800 rounded h-10 w-12 bg-white" />
              <div className="">
                <p className="text-zinc-200">State Bank of India</p>
                <p className="text-zinc-400">
                  **** &middot;&middot;&middot;&middot; 1234
                </p>
              </div>
            </div>
            <p className="text-zinc-200 font-semibold">₹12,345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(Bank);
