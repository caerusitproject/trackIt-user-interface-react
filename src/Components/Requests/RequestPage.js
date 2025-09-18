import { Outlet } from "react-router-dom";
import MyTaskAddition from "./MyTaskAddition";
import RequestsTable from "./RequestsTable";
import styled from "styled-components";
import { Paper } from "@mui/material";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
`;


export default function Request() {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        m: 1,
        borderRadius: 3,
        
      }}
    >
      <ContentWrapper>
        <MyTaskAddition />
        <RequestsTable />
        {/* <Outlet /> */}
      </ContentWrapper>
    </Paper>
  );
}
