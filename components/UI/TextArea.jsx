import { cn } from "@/utils/utils";

const { forwardRef } = require("react");

const TextArea = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <textarea
      type={type}
      className={cn(
        `px-2 py-1 border rounded outline-none border-stone-700 mt-1 `,
        className
      )}
      ref={ref}
      rows={4}
      cols={40}
      {...props}
    />
  );
});

export default TextArea;
