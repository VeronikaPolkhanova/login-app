import clsx from "clsx";

const Logo = ({ className }: { className?: String }) => {
  return (
    <div className={clsx("flex gap-2 justify-center items-center", className)}>
      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      <span className="text-sm font-medium text-[#000000E0]">Company</span>
    </div>
  );
};

export default Logo;
