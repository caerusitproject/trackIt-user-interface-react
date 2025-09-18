import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import { NavLink } from "react-router-dom";

export default function UpperNavbar({col}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Request", icon: <ConfirmationNumberIcon />, path: "/request" },
    { text: "Solution", icon: <EmojiObjectsIcon />, path: "/solution" },
    { text: "Asset", icon: <AttachMoneyIcon />, path: "/asset" },
    { text: "Report", icon: <FlagIcon />, path: "/report" },
  ];

  return (
    <>
      {/* AppBar at the top */}
      <AppBar position="fixed" sx={{ background: "#1d1d1d" }}>
        <Toolbar>
          {/* Hamburger */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>

         
        
      </AppBar>
    </>
  );
}
