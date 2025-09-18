import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Tab, Box, Card, CardContent, Typography } from "@mui/material";
import { Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import {
Container,
TicketRow,
LeftColumn,
RightColumn,
ActionBar,
StatusDot,
rowStyle,
labelStyle,
valueStyle
} from "../../../../styled_components/requestTicketDetails"

export default function TicketRight() {
  const [activeTab,setActiveTab]=React.useState(0);

   const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <RightColumn>
      <div>
        <strong>Status</strong> : <StatusDot bg="yellow" border="#e9e900" /> Open
      </div>
      <div>
        <strong>Priority</strong> :{" "}
        <StatusDot bg="#53d26f" border="#158c3d" /> Normal
      </div>
      <div>
        <strong>Technician</strong> : <span className="fw-bold">XYZ</span>
      </div>
      <div>
        <strong>Group</strong> : Application Support
      </div>
      <div>
        <strong>Site</strong> : <span className="fw-bold">Site 1</span>
      </div>
      <hr />
      <div style={{ color: "red", fontSize: "0.95rem" }}>More Properties</div>
      <div>
         <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              minHeight: "32px",
              "& .MuiTab-root": { fontSize: "12px", padding: "0 8px" },
            }}
          >
            <Tab label="Share" />
            <Tab label="Share Request" />
          </Tabs>
        {/* <span className="text-secondary">Share</span>
        <button className="btn btn-light border btn-sm ms-2">Share Request</button> */}
      </div>
      {activeTab == 0 &&
        <div>
            <div style={rowStyle}>
              <span style={labelStyle}>Associate Project</span>
              {/* <span style={labelStyle}>Tags</span> */}
              <span style={labelStyle}>No tags added</span>
            </div>
        </div>
      }
      {
        activeTab == 1 && 
         <div>
            <div style={rowStyle}>
              <span style={labelStyle}>Associate Project 1</span>
              <span style={valueStyle}>Tags - 1</span>
              <span style={valueStyle}>No tags added - 1</span>
            </div>
        </div>
      }
      
      {/* <div style={{ marginTop: "0.5rem" }}>
        <strong>Associate Project</strong>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <strong>Tags</strong>
        <div className="text-muted small">No tags added</div>
      </div> */}
    </RightColumn>
  );
}
