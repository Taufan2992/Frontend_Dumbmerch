import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../context/user-context";

function Navbaradmin() {
  const [_, dispatch] = useContext(UserContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          <div>
            <NavLink to="/product">
              {" "}
              <img alt="" src={logo} style={{ height: 60, width: 60 }} />{" "}
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/Category"
                  style={({ isActive }) => ({
                    color: isActive ? "#f74d4d" : "#ffffff",
                  })}
                >
                  Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/Product"
                  style={({ isActive }) => ({
                    color: isActive ? "#f74d4d" : "#ffffff",
                  })}
                >
                  Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  onClick={handleLogout}
                  to="/Login"
                  style={({ isActive }) => ({
                    color: isActive ? "#f74d4d" : "#ffffff",
                  })}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbaradmin;
