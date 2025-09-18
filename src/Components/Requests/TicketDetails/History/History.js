// OracleAccessHistory.jsx
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// 🔹 Styled Components
const GreyBorderBox = styled(Paper)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  borderRadius: "5px",
  padding: theme.spacing(2, 0, 1, 0),
  background: "#fff",
}));

const TimeBadge = styled("span")(({ theme }) => ({
  fontSize: "1.01rem",
  fontWeight: 500,
  color: "#1976d2",
  background: "#e3f2fd",
  padding: "3px 10px",
  borderRadius: "4px",
  minWidth: "70px",
  display: "inline-block",
  textAlign: "center",
  "&.green": {
    background: "#f1fbe7",
    color: "#33691e",
  },
}));

const IconCircle = styled("span")(() => ({
  width: "34px",
  height: "34px",
  background: "#ececec",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  color: "#666",
}));

const HistoryRow = styled(Grid)(() => ({
  padding: "12px 0",
  gap:"12px",
  borderBottom: "1px solid #eee",
  "&:last-child": {
    borderBottom: "none",
  },
}));

const NoteLink = styled("a")(() => ({
  color: "#e53935",
  textDecoration: "underline",
  fontWeight: 500,
}));

// 🔹 Main Component
export default function OracleAccessHistory() {
  const [tab, setTab] = useState("history");

  return (
  <Paper elevation={6}
   sx={{
         border: '3px solid',
          borderColor: "rgba(235, 137, 81, 0.89)",
          borderRadius: '8px',
          p: 3,
          mb: 2,
          position: 'relative',
          backgroundColor: 'background.paper',
      }}
  >
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Row 1: Notes Created */}
      <GreyBorderBox>
        <HistoryRow container alignItems="center">
          <Grid item xs={3} md={2} textAlign="right" pr={1}>
            <TimeBadge>04:10 PM</TimeBadge>
          </Grid>
          <Grid item xs={1} textAlign="center">
            <IconCircle>✎</IconCircle>
          </Grid>
          <Grid item xs>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Typography fontWeight={600}>Notes Created</Typography>
              <Typography sx={{ color: "#6f6f6f", ml: 1 }}>by</Typography>
              <Typography sx={{ fontWeight: 500, color: "#222", ml: 1 }}>
                user1
              </Typography>
              <Typography
                sx={{ ml: 2, fontSize: "0.85rem", color: "text.secondary" }}
              >
                (Private)
              </Typography>
            </Box>
            <Typography fontSize="0.85rem" mt={0.5}>
              Note: <NoteLink href="#">Click Here</NoteLink>
            </Typography>
          </Grid>
        </HistoryRow>
      </GreyBorderBox>

      {/* Row 2: Seen */}
      <GreyBorderBox>
        <HistoryRow container alignItems="center">
          <Grid item xs={3} md={2} textAlign="right" pr={1}>
            <TimeBadge className="green">04:07 PM</TimeBadge>
          </Grid>
          <Grid item xs={1} textAlign="center">
            <IconCircle>👁️</IconCircle>
          </Grid>
          <Grid item xs>
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600}>Seen</Typography>
              <Typography sx={{ color: "#6f6f6f", ml: 1 }}>by</Typography>
              <Typography sx={{ fontWeight: 500, color: "#222", ml: 1 }}>
                User3
              </Typography>
            </Box>
            <Typography fontSize="0.85rem" mt={0.5} color="text.secondary">
              ISREAD changed from false to true
            </Typography>
          </Grid>
        </HistoryRow>
      </GreyBorderBox>

      {/* Row 3: Updated */}
      <GreyBorderBox>
        <HistoryRow container alignItems="center">
          <Grid item xs={3} md={2} textAlign="right" pr={1}>
            <TimeBadge>04:03 PM</TimeBadge>
          </Grid>
          <Grid item xs={1} textAlign="center">
            <IconCircle>✎</IconCircle>
          </Grid>
          <Grid item xs>
            <Typography fontWeight={600}>Updated</Typography>
            <Box mt={1} fontSize="0.85rem">
              <Typography>
                <strong>Due By Date:</strong> Jul 3, 2025 03:10 PM
              </Typography>
              <Typography>
                <strong>SLA:</strong> Level 2
              </Typography>
              <Typography>
                <strong>Status:</strong> Open
              </Typography>
              <Typography>
                <strong>Site:</strong> -
              </Typography>
              <Typography>
                <strong>Category:</strong> Software
              </Typography>
              <Typography>
                <strong>Subcategory:</strong> Oracle
              </Typography>
              <Typography>
                <strong>Technician:</strong> -
              </Typography>
              <Typography>
                <strong>Priority:</strong> Normal
              </Typography>
              <Typography>
                <strong>Impact:</strong> Single-User
              </Typography>
              <Typography>
                <strong>Urgency:</strong> 2 Business Days
              </Typography>
              <Typography>
                <strong>Group:</strong> Application Support
              </Typography>
            </Box>
          </Grid>
        </HistoryRow>
      </GreyBorderBox>

      {/* Row 4: Created */}
      <GreyBorderBox>
        <HistoryRow container alignItems="center">
          <Grid item xs={3} md={2} textAlign="right" pr={1}>
            <TimeBadge>03:10 PM</TimeBadge>
          </Grid>
          <Grid item xs={1} textAlign="center">
            <IconCircle>💼</IconCircle>
          </Grid>
          <Grid item xs>
            <Typography fontWeight={600}>Created</Typography>
            <Typography
              sx={{ ml: 1, fontSize: "0.85rem", color: "text.secondary" }}
              component="span"
            >
              by SYSTEM
            </Typography>
          </Grid>
        </HistoryRow>
      </GreyBorderBox>
    </Box>
  </Paper>

  )
}
