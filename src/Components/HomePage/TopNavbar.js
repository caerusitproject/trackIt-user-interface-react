import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CaerusLogo from "../../assets/CaerusLogo.png";
import * as actions from "../../stores/actions";
import DrawerSidebar from "./DrawerSidebar"; // ⬅ import the component you already built
import { validateAvatarName } from "../../Config/utils";
import { deepPurple } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopNavbar({ isMobile, setIsMobile }) {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const userProfileName = useSelector((state) => state.user.userProfileData);
  const collapsed = useSelector((state) => state.login.collapsed);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.fetchUserDataProfile());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    
    return () => {
      dispatch(actions.openSideDrawer("", false));
    }
  }, [dispatch]);
  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(241, 125, 58, 0.89)",
          backdropFilter: "blur(5px)",
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => dispatch(actions.openCollapsed(collapsed))}
              sx={{ color: "white" }}
            >
              {collapsed ? <MenuIcon /> : <HighlightOffIcon />}
            </IconButton>
            <img src={CaerusLogo} alt="Logo" width="128px" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>

            <Tooltip title="Notifications">
              <IconButton sx={{ color: "white" }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton sx={{ color: "white" }} onClick={() => setOpenDrawer(true)}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton sx={{ color: "white" }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {validateAvatarName(userProfileName?.firstName, userProfileName?.lastName)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Attach the settings drawer here */}
      <DrawerSidebar
        open={openDrawer}
        setOpen={setOpenDrawer}
        navigate={navigate}
        handleNavigate={(path) => navigate(path)}
      />
    </>
  );
}
