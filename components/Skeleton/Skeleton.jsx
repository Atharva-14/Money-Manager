const Skeleton = ({ classname, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded bg-neutral-800 ` + classname}
      {...props}
    />
  );
};

export default Skeleton;
