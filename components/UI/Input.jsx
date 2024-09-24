const { forwardRef } = require("react");

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={
        `px-2 py-1 border rounded outline-none border-stone-700 mt-1 ` +
        className
      }
      ref={ref}
      {...props}
    />
  );
});

export default Input;
