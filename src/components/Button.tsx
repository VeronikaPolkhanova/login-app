import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "icon";
};

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const base =
    "rounded-md font-normal text-[16px] cursor-pointer focus:outline-none disabled:bg-[#0000000A] disabled:text-[#00000040] disabled:border disabled:border-[#D9D9D9] disabled:cursor-not-allowed transition-colors";

  const variants: Record<typeof variant, string> = {
    primary:
      "w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    icon: "w-auto py-0 px-0 flex items-center cursor-pointer text-gray-500 hover:text-black",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
