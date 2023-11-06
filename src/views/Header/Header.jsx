import React from "react";
import { Avatar, Badge, IconButton } from "@mui/material";
import { Notifications } from "@material-ui/icons";
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
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton edge="end" color="inherit">
          <Avatar alt="Avatar" src={avatar} />
        </IconButton>
      </div>
    </div>
  );
}
