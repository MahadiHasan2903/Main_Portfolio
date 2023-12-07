import React from "react";
import Dashboard from "../../../lib/components/Admin/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <section className="min-h-screen pt-2">
      <div className="container mx-auto">
        <h2 className="mx-auto mb-8 text-center section-title xl:mb-16">
          Admin Dashboard
        </h2>
        <Dashboard />
      </div>
    </section>
  );
};

export default DashboardPage;
