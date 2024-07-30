import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navLinks = [
    {
      to: "/",
      title: "USER",
    },
    {
      to: "/admins",
      title: "ADMINS",
    },
    {
      to: "/special-offers",
      title: "SPECIAL OFFERS",
    },
    {
      to: "/blogs",
      title: "BlOGS",
    },
    {
      to: "/featured-destinations",
      title: "FEATURED DESTINATIONS",
    },
  ];

  return (
    <aside className="bg-sky-600">
      <ul className="flex flex-col">
        {navLinks.map((item, index) => (
          <li key={index + 1}>
            <NavLink
              to={item.to}
              className="flex items-center gap-2 text-xl text-white p-5"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
