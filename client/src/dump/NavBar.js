import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          <Link to="/" className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">Home</Link>
        </li>
        <li className="mr-1">
          <Link
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            to="/addBook"
          >
            Add Book
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            to="/viewBook"
          >
            View Book
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
  
            href="#"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
