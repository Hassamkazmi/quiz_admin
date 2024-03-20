import React, { Component, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "../../maincss/responsive.css";
import { Accordion, Nav } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import { useSelector } from "react-redux";

function Sidebar({ routes }) {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const storeTheme  = localStorage.getItem("primary")
    document.documentElement.style.setProperty(
      "--primary-color",
      storeTheme || "#750004"
    );

  document.documentElement.style.setProperty(
    "--font-color",
    "#fff"
  );

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    localStorage.setItem("date",formattedDate)
  },[])
  return (
    <div className="sidebar">
      <div className="sidebar-background" />
      <div className="sidebar-wrapper sideBarComp">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="logo-img">
            {/* <img src={Logo} alt="..." className="logo" /> */}
            <h2>Pair Perfect</h2>
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              return (
                <li
                className={
                  prop.upgrade
                    ? "active active-pro"
                    : activeRoute(prop.layout + prop.path)
                }
                key={key}
              >
                <NavLink to={prop.path} className="nav-link">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
              </li>
              );
            }

            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;