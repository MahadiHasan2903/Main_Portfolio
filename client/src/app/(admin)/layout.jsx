import Sidebar from "../../lib/components/Sidebar/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center w-full h-full border-t border-t-1">
      <div className="w-[80px] h-full md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4">
        <Sidebar />
      </div>
      <div className="w-full h-full p-5 bg-transparent">{children}</div>
    </div>
  );
};

export default Layout;
