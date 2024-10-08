import Skeleton from "./Skeleton";

const SkeletonBank = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Skeleton classname="h-10 w-14" />
        <div className="flex flex-col space-y-2">
          <Skeleton classname="h-3 w-24" />
          <Skeleton classname="h-3 w-24" />
        </div>
      </div>
      <div className="flex space-x-2">
        <Skeleton classname="h-5 w-24" />
        <Skeleton classname="h-5 w-5" />
        <Skeleton classname="h-5 w-5" />
      </div>
    </div>
  );
};

export default SkeletonBank;
