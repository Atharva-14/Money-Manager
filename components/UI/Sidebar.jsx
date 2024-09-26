import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="flex flex-col p-6 w-[250px] h-screen bg-slate-200">
      <Link href="/" className="font-bold text-xl">
        Money Manager
      </Link>
      <div className="flex flex-col mt-6">
        <Link href="/" className="text-lg">
          Dashboard
        </Link>
        <Link href="/transaction" className="text-lg">
          Transaction
        </Link>
        <Link href="/category" className="text-lg">
          Categories
        </Link>
        <Link href="/banks" className="text-lg">
          Banks
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
