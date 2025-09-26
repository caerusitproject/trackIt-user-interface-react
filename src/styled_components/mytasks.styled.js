
import styled from "styled-components";

export const TasksPanel = styled.div`
  padding:3px;
  background: #fff;
  border: 1.3px solid #c4c4c4;
  border-radius: 7px;
  min-width: 300px;
  max-width: 310px;
  min-height: 565px;
  height: 390px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px #dfdfdf55;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.06em;
    color: #abb2be;
  }
`;

export const TasksHeader = styled.div`
  background: #f6f6fa;
  padding: 10px 14px 10px 16px;
  border-bottom: 1px solid #e3e3e3;
  font-weight: 600;
  font-size: 1.07em;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7px;
  svg {
    color: #959596;
    font-size: 1.05em;
    cursor: pointer;
  }
`;

export const TasksToolbar = styled.div`
  padding: 6px 14px;
  background: #fcfcfe;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const ToolbarSelect = styled.select`
  font-size: 0.97em;
  min-width: 100px;
  padding: 3px 9px;
  border-radius: 6px;
`;



export const TasksContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyImage = styled.img`
  width: 60px;
  opacity: 0.94;
  margin-bottom: 12px;
`;

export const EmptyText = styled.div`
  color: #686a71;
  font-size: 1.09em;
  margin-bottom: 16px;
`;

export const NewTaskButton = styled.button`
  cursor:pointer;
  border: 1.2px solid #b0b6c6;
  color: #2746bb;
  background: #f6fafd;
  border-radius: 6px;
  padding: 4px 18px;
  font-size: 1.01em;
  font-weight: 500;
  display:flex;
  justify-contents:center;
  align-items:center;
  transition: background 0.13s;
  &:hover {
    background: #edecf8;
    border-color: #2744ae;
    color: #183089;
  }
`;

export const TasksFooter = styled.div`
  background: #fafafd;
  border-top: 1px solid #e3e3e3;
  padding: 5px 14px;
  font-size: 0.97em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  button {
    background: none;
    border: none;
    font-size: 1.3em;
    cursor: pointer;
    color: #777;
  }
`;