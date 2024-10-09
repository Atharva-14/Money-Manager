import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
