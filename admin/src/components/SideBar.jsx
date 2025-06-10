import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    navigate("/"); // redirect to home or login page
  };
  return (
    <div className="flex-1/5">
      <div className="fixed top-0 left-0 h-full w-1/5 bg-gray-800 text-white">
        <ul className="flex flex-col items-start sidebar-menu-list mt-8">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/list"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Food List
            </NavLink>
          </li>
          <li>
          {token && <button type="button" className=" cursor-pointer" onClick={handleLogout}>LogOut</button>}
          </li>
        </ul>

        
      </div>
    </div>
  );
};

export default SideBar;
