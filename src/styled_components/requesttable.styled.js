import styled from "styled-components";
import { TableRow,TableCell,TableContainer } from "@mui/material";
export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f1f3f5;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
  gap: 8px;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
  gap: 8px;
`;

export const StyledTableContainer = styled(TableContainer)`
  // border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  min-height: 470px;   
`;

export const StyledHeaderRow = styled(TableRow)`
  background-color: #f5f5f5;
`;

export const StyledHeaderCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
  font-size: 14px;
`;

export const StyledRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #fafafa;
  }
  &:hover {
    background-color: #f0f7ff;
    cursor: pointer;
  }
`;

export const StyledCell = styled(TableCell)`
  font-size: 14px;
  color: #555;
`;

export const YellowDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #ffcd00;
  border-radius: 50%;
  margin-right: 8px;
`;