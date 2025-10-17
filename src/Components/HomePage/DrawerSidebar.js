import React, { use, useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  Switch,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  deepPurple
} from "@mui/material/colors";

import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import KeyIcon from "@mui/icons-material/VpnKey";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

import { useDispatch,useSelector } from "react-redux";
import * as actions from "../../stores/actions";
import { logoutService } from "../../services/users.services";
import ConfirmationDialog from "../../Config/ConfirmationDialogue";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {
  Header,
  OnlineBadge,
  LogoutButton,
  Option,
  ColorRow,
  ColorCircle,
  ResetButton
} from "../../styled_components/navbar.styled";

export default function DrawerSidebar({ handleNavigate, navigate, open, setOpen }) {
  const dispatch = useDispatch();
  const userProfileData =useSelector((state)=>state.user.userProfileData)
  // Local UI states
  const [layout, setLayout] = useState("topbar");
  const [font, setFont] = useState("Roboto");
  const [color, setColor] = useState("#3f51b5");
  const [nightMode, setNightMode] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);
  
  console.log('userProfileData_____',userProfileData)

  // Logout confirmation handler
  const handleAgreedAction = async () => {
    const refreshToken = localStorage.getItem("refresh-token");
    if (!refreshToken) return;
    // dispatch(actions.logout());
    // handleNavigate("/login");
    // navigate("/login", { replace: true });
    try {
      dispatch(actions.openLoader());
      const res = await logoutService({ refreshToken });
      dispatch(actions.closeLoader());

      if (res) {
        dispatch(actions.logout());
        dispatch(actions.openSnackbar({ message: res?.message, status: "success" }));
        handleNavigate("/login");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      dispatch(actions.closeLoader());
      dispatch(actions.openSnackbar({ message: err?.message, status: "error" }));
    }
    
  };

  // Logout trigger with confirmation modal
  const triggerLogout = () => {
    dispatch(actions.openSideDrawer("Are you sure you want to logout?", true));
  };

  // Colors for theme personalization
  const colorOptions = ["#28a745", "#dc3545", "#007bff", "#6f42c1"];

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          zIndex: 1300,
          "& .MuiDrawer-paper": {
            width: { xs: "90%", sm: 400, md: 420 },
            borderRadius: "12px 0 0 12px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            overflowY: "auto",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* ==== HEADER ==== */}
          <Header>
            <Avatar sx={{ width: 64, height: 64, bgcolor: deepPurple[500] }}>
              U
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">{`${userProfileData?.firstName} ${userProfileData?.lastName}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userProfileData?.email}
              </Typography>
              <OnlineBadge>ONLINE</OnlineBadge>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton>
          </Header>

          {/* ==== LOGOUT ==== */}
          <LogoutButton onClick={triggerLogout} startIcon={<LogoutIcon />}>
            Log out
          </LogoutButton>

          <Divider sx={{ my: 1 }} />

          {/* ==== SETTINGS OPTIONS ==== */}
           
          <Option onClick={() => {
            navigate("/account-details")
            setOpen(false)
          }}>
            <SupervisedUserCircleIcon fontSize="small" />
            <Typography>Account Profile</Typography>
          </Option>
           
          <Option>
            <MusicNoteIcon fontSize="small" />
            <Typography>Notification Tones</Typography>
          </Option>
          <Option>
            <KeyIcon fontSize="small" />
            <Typography>Generate Authtoken</Typography>
          </Option>

          <Divider sx={{ my: 2 }} />

          {/* ==== LAYOUT SETTINGS ==== */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Layout Personalization
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Navigation Menu
          </Typography>
          <RadioGroup
            row
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <FormControlLabel value="topbar" control={<Radio />} label="Topbar" />
            <FormControlLabel value="sidebar" control={<Radio />} label="Sidebar" />
            <FormControlLabel value="sidebarLite" control={<Radio />} label="Sidebar Lite" />
          </RadioGroup>

          {/* ==== FONT SELECTION ==== */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Preferred Font
          </Typography>
          <Select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            fullWidth
            size="small"
          >
            {["Roboto", "Open Sans", "Inter"].map((fontOption) => (
              <MenuItem key={fontOption} value={fontOption}>
                {fontOption}
              </MenuItem>
            ))}
          </Select>

          {/* ==== COLOR SELECTION ==== */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Preferred Color
          </Typography>
          <ColorRow>
            {colorOptions.map((clr) => (
              <ColorCircle
                key={clr}
                color={clr}
                active={color === clr}
                onClick={() => setColor(clr)}
              />
            ))}
            <ResetButton onClick={() => setColor("#3f51b5")}>Reset</ResetButton>
          </ColorRow>

          {/* ==== NIGHT MODE ==== */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Night Mode
          </Typography>
          <Switch
            checked={nightMode}
            onChange={(e) => setNightMode(e.target.checked)}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" align="center">
            Stay connected to stay productive 💪
          </Typography>
        </Box>
      </Drawer>

      {/* ==== GLOBAL CONFIRMATION MODAL ==== */}
      <ConfirmationDialog agreedAction={handleAgreedAction} />
    </>
  );
}
