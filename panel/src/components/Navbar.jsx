import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="h-[80px] w-full px-4 bg-sky-700">
      <div className="container h-full flex items-center justify-center">
        <Link className="text-white text-2xl " to={"/"}>
          ADMIN PANEL
        </Link>
      </div>
    </header>
  );
};
