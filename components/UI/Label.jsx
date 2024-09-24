const { forwardRef } = require("react");

const Label = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      className={`text-sm font-medium text-neutral-100 ` + className}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
});

export default Label;
