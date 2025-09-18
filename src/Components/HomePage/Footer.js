import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import WifiChannelIcon from "@mui/icons-material/WifiChannel";
import { IconButton, Paper } from "@mui/material";
import {FooterRow,
FooterItem,
FooterLabel } from "../../styled_components/footer.styled"
import Badge from '@mui/material/Badge';


export default function Footer() {
  return (
    <Paper
      elevation={6} // 🔥 Material shadow depth (0–24)
      sx={{
        borderRadius: "0.5rem",
        marginTop: 2,
        backgroundColor: "#fff",
      }}
    >
      <FooterRow>
        <FooterItem>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <FooterLabel>Chats</FooterLabel>
        </FooterItem>

        <FooterItem>
          
          <IconButton>
            <Badge badgeContent={4} color="primary">
             <GroupsIcon sx={{ color: "#d94444" }} />
            </Badge>
          </IconButton>
          <FooterLabel>Groups</FooterLabel>
        </FooterItem>

        <FooterItem>
          <IconButton>
            <WifiChannelIcon />
          </IconButton>
          <FooterLabel>Channels</FooterLabel>
        </FooterItem>
      </FooterRow>
    </Paper>
  );
}
