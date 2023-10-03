import React from "react";
import "../Style/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

function Header({photoURL}) {
  return (
    <div className="header">
      <div className="header__logo">
        <img
          src="https://cdn-icons-png.flaticon.com/128/5968/5968523.png"
          alt="header__logo"
        />
        <span>Drive</span>
      </div>
      <div className="header__search">
        <SearchIcon />
        <input type="text" placeholder="Search in drive" />
        <FormatAlignRightIcon />
      </div>
      <div className="header__icons">
        <span>
          {" "}
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
       
        <span>
          {" "}
          <AppsOutlinedIcon />
          <Avatar src={photoURL}/>
        </span>
       
      </div>
    </div>
  );
}

export default Header;
