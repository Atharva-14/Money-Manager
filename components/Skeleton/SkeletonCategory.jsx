import Skeleton from "./Skeleton";

const SkeletonCategory = () => {
  return (
    <div className="space-y-2 w-full">
      <Skeleton classname="h-3 w-[150px]" />

      <div className="flex space-x-2">
        <Skeleton classname="h-5 w-16 rounded-xl" />
        <Skeleton classname="h-5 w-16 rounded-xl" />
        <Skeleton classname="h-5 w-16 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCategory;
