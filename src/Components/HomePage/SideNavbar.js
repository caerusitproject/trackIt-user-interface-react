import React, { useState } from "react";
import "./sidebar.css";
import {
  ProSidebar,
  Sidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import {useSelector} from "react-redux";
import { Tooltip } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { NavLink, useLocation } from "react-router-dom";
import WebStoriesIcon from '@mui/icons-material/WebStories';

export default function SideNavbar() {
  const collapsed =useSelector((state)=>state.login.collapsed)
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <ProSidebar 
       collapsed={collapsed} 
       >
        {/* Header */}
        <SidebarHeader style={{ padding: "5px", textAlign: "center" }}>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
         
          <Menu
          active={location.pathname === "/home" }
          > 
           {collapsed && Boolean(collapsed) == true ?


               <Tooltip  placement="right" title="Home" arrow> 
                  <MenuItem
                    icon={<HomeFilledIcon />}
                    active={location.pathname === "/home"}
                    // component={<NavLink to="/request" />}
                  >
                    <NavLink to="/home" />
                    Home
                  </MenuItem>
                </Tooltip>
               
                :
                <MenuItem
                  icon={<HomeFilledIcon />}
                  active={location.pathname === "/home"}
                  // component={<NavLink to="/request" />}
                >
                  <NavLink to="/home" />
                  Home
                </MenuItem>
             }
             {collapsed && Boolean(collapsed) == true ?
                <Tooltip  placement="right" title="Request" arrow>
                    <MenuItem
                      icon={<ConfirmationNumberIcon />}
                      active={location.pathname === "/request"}
                      // component={<NavLink to="/request" />}
                    >
                      <NavLink to="/request" />
                      Request
                    </MenuItem>
                </Tooltip>
              :
                  <MenuItem
                    icon={<ConfirmationNumberIcon />}
                    active={location.pathname === "/request"}
                    // component={<NavLink to="/request" />}
                  >
                    <NavLink to="/request" />
                    Request
                  </MenuItem>
              }
               {collapsed && Boolean(collapsed) == true ?
                <Tooltip  placement="right" title="Solution" arrow>
                  <MenuItem
                      icon={<EmojiObjectsIcon />}
                      active={location.pathname === "/solution"}
                      // component={<NavLink to="/solution" />}
                    >
                      <NavLink to="/solution" />
                      Solution
                    </MenuItem>
                </Tooltip>
         
              :
               <MenuItem
                  icon={<EmojiObjectsIcon />}
                  active={location.pathname === "/solution"}
                  // component={<NavLink to="/solution" />}
                >
                  <NavLink to="/solution" />
                  Solution
                </MenuItem>
               }
              {collapsed && Boolean(collapsed) == true ?
                <Tooltip  placement="right" title="Asset" arrow>
                  <MenuItem
                    icon={<AttachMoneyIcon />}
                    active={location.pathname === "/assets"}
                    // component={<NavLink to="/asset" />}
                  >
                    <NavLink to="/assets" />
                    Asset
                  </MenuItem>
                  </Tooltip>
                    :
                    <MenuItem
                        icon={<AttachMoneyIcon />}
                        active={location.pathname === "/assets"}
                        // component={<NavLink to="/asset" />}
                      >
                    <NavLink to="/assets" />
                      Asset
                    </MenuItem>
                   }
        {collapsed && Boolean(collapsed) == true ?
          <Tooltip  placement="right" title="Report" arrow>
            <MenuItem
              icon={<FlagIcon />}
              active={location.pathname === "/report"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/report" />
              Report
            </MenuItem>
            </Tooltip>
          :
             <MenuItem
              icon={<FlagIcon />}
              active={location.pathname === "/report"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/report" />
              Report
            </MenuItem>
          }

          {collapsed && Boolean(collapsed) == true ?
          <Tooltip  placement="right" title="Asset Menu Builder" arrow>
            <MenuItem
              icon={<BuildIcon />}
              active={location.pathname === "/asset-menu-builder"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/asset-menu-builder" />
              Asset Menu Builder
            </MenuItem>
            </Tooltip>
          :
             <MenuItem
              icon={<BuildIcon />}
              active={location.pathname === "/asset-menu-builder"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/asset-menu-builder" />
              Asset Menu Builder
            </MenuItem>
          }

            {collapsed && Boolean(collapsed) == true ?
          <Tooltip  placement="right" title="Milestone Builder" arrow>
            <MenuItem
              icon={<WebStoriesIcon />}
              active={location.pathname === "/milestone-builder"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/milestone-builder" />
              Milestone Builder
            </MenuItem>
            </Tooltip>
          :
             <MenuItem
              icon={<WebStoriesIcon />}
              active={location.pathname === "/milestone-builder"}
              // component={<NavLink to="/report" />}
            >
              <NavLink to="/milestone-builder" />
                Milestone Builder
            </MenuItem>
          }
          </Menu>
          
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter style={{ textAlign: "center", padding: "10px" }}>
          <div style={{ color: "#aaa", fontSize: "14px" }}>
            © 2025 My App
          </div>
        </SidebarFooter>
      </ProSidebar>
    
    </div>
  );
}
