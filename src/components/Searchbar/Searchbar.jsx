import React from "react";
import { InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./Searchbar.css";

export default function Searchbar() {
  return (
    <div className="search">
      <div className="searchIconWrapper">
        <SearchIcon />
      </div>
      <InputBase
        className="inputBase"
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
