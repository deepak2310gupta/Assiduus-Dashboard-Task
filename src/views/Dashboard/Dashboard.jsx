import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";
import GraphViews from "../GraphViews/GraphViews";
import { SIDENAV_MENU_ITEMS } from "../../constants/constants";
import logo from "../../assets/logo2.jpg";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <Router>
      <div className="dashboard">
        <div className="sidebar">
          <SideNav logo={logo} />
        </div>

        <div className="main">
          <div className="header">
            <Header />
          </div>
          <Routes>
            {SIDENAV_MENU_ITEMS?.map((menuItems) => (
              <Route
                path={menuItems.pathLink}
                element={<GraphViews />}
                key={menuItems.pathLink}
              />
            ))}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
