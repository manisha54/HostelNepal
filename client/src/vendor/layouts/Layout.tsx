import React, { ReactNode } from "react";
import NavAdmin from "./Nav";
import Sidebar from "./Sidebar";
import { twMerge } from "tailwind-merge";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <>
      {/* <NavAdmin /> */}
      <div
        className={`w-[95%] lg:w-[90%] m-auto ${className} overflow-x-hidden`}
      >
        <div className="flex mt-10">
          <Sidebar />
          <div className={twMerge("w-full", className)}> {children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
