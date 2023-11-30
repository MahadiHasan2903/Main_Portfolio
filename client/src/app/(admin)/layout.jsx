import Sidebar from "../../lib/components/Admin/Sidebar/Sidebar";
import React from "react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const Layout = ({ children }) => {
  return (
    <div className="border-t border-t-1 ">
      <div className="flex justify-center w-full h-full ">
        <div className="w-[80px] h-full md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4 ">
          <Sidebar />
        </div>
        <div className="w-full h-full p-5 bg-transparent">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
