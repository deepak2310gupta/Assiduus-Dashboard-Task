import React from "react";
import { Avatar, Badge, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Searchbar from "../../components/Searchbar/Searchbar";
import avatar from "../../assets/avatar.jpg";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-wrapper">
      <div>
        <Searchbar />
      </div>
      <div className="header-subwrapper">
        <IconButton color="inherit">
          <Badge variant="dot" color="secondary">
          <NotificationsIcon/>
          </Badge>
        </IconButton>
        <IconButton edge="end" color="inherit">
          <Avatar alt="Avatar" src={avatar} />
        </IconButton>
      </div>
    </div>
  );
}
