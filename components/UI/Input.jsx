import { cn } from "@/utils/utils";

const { forwardRef } = require("react");

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `px-2 py-1 border rounded outline-none border-stone-700 mt-1 `,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
