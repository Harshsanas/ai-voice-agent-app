import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="p-10 mt-15 md:px-20 lg:px-32 xl:px-48 2xl:px-72">
        {children}
      </div>
    </div>
  );
}
