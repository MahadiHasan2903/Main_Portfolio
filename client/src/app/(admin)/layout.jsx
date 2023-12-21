import Sidebar from "../../lib/components/Admin/Sidebar/Sidebar";
import React from "react";
import ProtectedRoute from "../../lib/components/AuthProvider/ProtectedRoute";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="border-t border-t-1 ">
        <div className="flex justify-start w-full h-full md:justify-center ">
          <div className="w-[80px] h-full md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4 ">
            <Sidebar />
          </div>
          <div className="w-full h-full p-5 overflow-x-hidden bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
