import React from 'react'
import { Box, Paper } from '@mui/material';
import RequestSLA from "./RequestSLA";
import {TimeElapsedAnalysis} from "./TimeElapsedAnalysis";
import {GroupTechnicianTables} from "./GroupTechnicianTables";


export default function TimeAnalysisWrapper() {
  return (
    <Box>
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
        <RequestSLA />
        <TimeElapsedAnalysis />
        <GroupTechnicianTables />
      </Paper>
    </Box>
  )
}
