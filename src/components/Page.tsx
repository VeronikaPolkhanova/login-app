import type { ReactNode } from "react";

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[440px] p-8 bg-white rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default Page;
