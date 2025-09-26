import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default";
};

const Input = ({ className, variant = "default", ...props }: InputProps) => {
  const base =
    "w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 transition-colors";

  const variants: Record<typeof variant, string> = {
    default: "border-gray-200 focus:ring-blue-500 focus:border-blue-500",
  };

  return (
    <input className={clsx(base, variants[variant], className)} {...props} />
  );
};

export default Input;
