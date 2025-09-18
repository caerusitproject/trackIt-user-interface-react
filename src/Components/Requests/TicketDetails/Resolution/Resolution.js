import React, { useState } from "react";
import styled from "styled-components";
import {
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TicketCustomFormatter from "../TicketCustomFormatter";

// ---------------- Styled Components ----------------
const TicketHeader = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9rem;

  .ticket-id {
    font-weight: bold;
    margin-right: 8px;
  }

  .fw-semibold {
    font-weight: 600;
  }

  .by-customer {
    margin-left: 8px;
    color: #333;
  }

  .date-text {
    margin-left: 12px;
    color: #474747;
  }
`;

const TemplateSelector = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  label {
    font-size: 0.98rem;
    margin-right: 8px;
  }

  .help-icon {
    margin-left: 8px;
    cursor: pointer;
    color: #4998f5;
    font-size: 1.2em;
  }
`;

// ---------------- Helper for TabPanel ----------------
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// ---------------- Main Component ----------------
export default function TicketResolution() {
  const [activeTab, setActiveTab] = useState(0);
  const [template, setTemplate] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <TicketCustomFormatter/>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Resolution" />
        <Tab label="Solutions" />
        <Tab label="Tried Solutions" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="body2" color="text.secondary">
          ✨ Add your resolution details here...
        </Typography>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Typography variant="body2" color="text.secondary">
          📘 Suggested solutions will appear here.
        </Typography>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Typography variant="body2" color="text.secondary">
          🛠️ Tried solutions can be documented here.
        </Typography>
      </TabPanel>

      {/* Template Selector */}
      <TemplateSelector>
        <label htmlFor="resTemplate">Use Resolution Template</label>
        <FormControl size="small">
          <Select
            id="resTemplate"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            displayEmpty
            style={{ minWidth: "180px" }}
          >
            <MenuItem value="">
              <em>--Select Template--</em>
            </MenuItem>
            <MenuItem value="Template 1">Template 1</MenuItem>
            <MenuItem value="Template 2">Template 2</MenuItem>
          </Select>
        </FormControl>
        <HelpOutlineIcon className="help-icon" titleAccess="Help" />
      </TemplateSelector>
    </Box>
  );
}
