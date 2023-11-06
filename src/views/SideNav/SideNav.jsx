import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDENAV_MENU_ITEMS } from "../../constants/constants";
import "./SideNav.css";

export default function SideNav({ logo }) {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  return (
    <div className="side-navbar">
      <div className="top-section">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="org-name">Equity</h2>
      </div>
      <div className="bottom-section">
        {SIDENAV_MENU_ITEMS?.map((menuItem) => (
          <div
            className={`nav-item ${
              selectedTab === menuItem.pathLink ? "active" : ""
            }`}
            onClick={() => handleTabClick(menuItem.pathLink)}
            key={menuItem.pathLink}
          >
            <div className="dflex">{menuItem.icon}</div>
            <div className="dflex">{menuItem.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
