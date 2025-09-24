import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Button,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const AssetsNavigation = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState("");

  // Example Menu Data
  const menuData = [
    {
      label: "Workstation",
      icon:<HomeWorkIcon/>,
      submenus: ["Laptops", "Desktops", "Tablets"],
    },
    {
      label: "Software",
      icon:<DesktopWindowsIcon/>,
      submenus: ["OS", "Productivity Tools", "Dev Tools"],
    },
    {
      label: "Accessories",
      icon:<WorkspacesIcon/>,
      submenus: ["Keyboards", "Monitors", "Docking Stations"],
    },
  ];

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer 
        anchor={"right"}
        open={open} 
        onClose={toggleDrawer(false)}
        sx={{ width: 240, flexShrink: 0,zIndex:1300 }}>
        <List sx={{ width: 240, mt: 0.5 }}>
          <Typography sx={{textAlign:"left",fontWeight:"bold",marginLeft:"12px"}}>Assets</Typography>
          {menuData.map((menu, index) => (
            <Box key={index}>
              <ListItemButton onClick={() => toggleMenu(menu.label)}>
                <ListItemIcon>
                    {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
                {openMenu === menu.label ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
                <Divider/>
              <Collapse
                in={openMenu === menu.label}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menu.submenus.map((submenu, idx) => (
                    <ListItemButton
                      key={idx}
                      sx={{ pl: 4 }}
                      onClick={() => setSelectedSubmenu(submenu)}
                    >
                      <ListItemText primary={submenu} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Drawer>

      {/* Workflow Panel */}
      <Box sx={{ p: 3, flex: 1 }}>
        {selectedSubmenu ? (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: "white",
              maxWidth: 400,
            }}
          >
            <Typography variant="h6">{selectedSubmenu} Workflow</Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button variant="contained">Add {selectedSubmenu}</Button>
              <Button variant="outlined">Manage {selectedSubmenu}</Button>
            </Box>
          </Box>
        ) : (
          <Typography>Select a submenu to view workflow</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AssetsNavigation;
