import React from 'react'
import { Tabs, Tab, Box, Card, CardContent, Typography } from "@mui/material";

export default function TicketCustomFormatter() {
  return (
    <Box sx={{ marginBottom: 2 }}>
    <Typography variant="body1">
    <strong style={{ color: "#f06c35" }}>#84581</strong> Oracle Access{" "}
    <span style={{ color: "red", fontSize: "0.85rem" }}>by Customer</span>{" "}
    <span style={{ fontSize: "0.85rem", color: "#6c757d", marginLeft: 8 }}>
        on Jul 1, 2023 03:10 PM
    </span>
    <span style={{ fontSize: "0.85rem", color: "#6c757d", marginLeft: 8 }}>
        Due By: Jul 3, 2025 03:10 PM
    </span>
    </Typography>
    </Box>
  )
}
