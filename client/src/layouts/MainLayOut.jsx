import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";

const MainLayOut = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <main className="flex-grow container mx-auto px-4 py-4 mb-20 min-h-[(100vh-9rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayOut;
