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
import TextEditor from "../Resolution/TextEditor"
import TicketResolution from "../Resolution/Resolution";
import TimeAnalysisWrapper from "../TimeAnalysis/TimeAnalysisWrapper";
import History from "../History/History";
import TicketCustomFormatter from "../TicketCustomFormatter"
import MilestoneFormRenderer from "../MileStone/MilestoneFormRenderer";

export default function TicketLeft() {
  const [tab, setTab] = useState(0);
  const {ticketId} = useParams();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log('Ticket ID____',ticketId)

  return (
    <LeftColumn>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: 2 }}
      >
        <Tab label="Details" />
        <Tab label="Resolution" />
        <Tab label="Milestone" />
        <Tab label="Time Analysis" />
        <Tab label="History" />
      </Tabs>
      {tab === 0 
       && 
      //  details Card to be shown
       <div>
         <TicketCustomFormatter/>

        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2">
              <p><strong>To : XYZ,</strong></p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>Thank You,</p>
            </Typography>
          </CardContent>
        </Card>

        <Typography
          variant="body2"
          sx={{ color: "#0d6efd", cursor: "pointer" }}
        >
          <i className="bi bi-paperclip"></i> Browse Files or Drag files here | Max size: 50 MB.
        </Typography>
       </div>
      }

      {tab === 1 &&
        // Resolution part to be rendered here 
      <>
        <TicketResolution/>
        <TextEditor/>
      </>
      }

      {tab === 2 &&
       // MileStone part to be rendered here 
        <>
        <MilestoneFormRenderer/>
          {/* <div>
            MileStone component will be rendered here.
          </div> */}
        </>
      }

      {tab === 3 &&
       //  Time Analysis part to be rendered here 
        <>
          <TicketCustomFormatter/>
          <TimeAnalysisWrapper/>
        </>
      }

      {tab === 4 &&
        //  History part to be rendered here 
        <>
          <TicketCustomFormatter/>
          <History/>
        </>
      }

      
    </LeftColumn>
  );
}
