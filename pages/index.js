import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const Home = () => {
  return (
    <div className="w-full">
      <h1>Home</h1>
    </div>
  );
};

export default PrivateRoute(Home);
