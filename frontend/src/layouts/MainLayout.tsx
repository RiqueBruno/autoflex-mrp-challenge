import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import React from "react";

export function DefaultLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col h-screen md:grid grid-cols-5">
      <div className="md:h-screen h-1/5 col-span-1">
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
      <main className="md:h-screen h-4/5 col-span-4 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
