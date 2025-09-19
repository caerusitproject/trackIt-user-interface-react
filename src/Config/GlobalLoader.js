import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function GlobalLoader() {
  const {loading} = useSelector((state)=>state.user)
  console.log('global loader___',loading)
  return (
    <Dialog
      open={loading}
      maxWidth="xs"
      PaperProps={{
        sx: {
          minWidth: "172px", // keep it compact
          padding: 2,
          textAlign: "center",
          minHeight:"40px"
        },
      }}
    >
      {/* Gradient definition */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Centered loader */}
      <Box sx={{ display: "flex", justifyContent: "center", gap:"8px", alignItems:"center", mt: 2 }}>
        <CircularProgress
          sx={{
            "svg circle": { stroke: "url(#my_gradient)" },
          }}
        />
        <p style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          fontSize: "1.2rem",
          fontWeight: 500,
        }}><b>Loading...</b></p>
      </Box>
    </Dialog>
  );
}
