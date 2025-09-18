import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import { default as Selected } from 'react-select';
import makeAnimated from 'react-select/animated';
import Slide from '@mui/material/Slide';
import TextEditor from "./TicketDetails/Resolution/TextEditor";

import dayjs from "dayjs";

// Styled container
const Container = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid #e0e0e0;
  margin: 35px auto;
  max-width: 1100px;
`;

const Header = styled.div`
  background-color: #f3f3f3;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  padding: 24px;
  margin: 30px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const animatedComponents = makeAnimated();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TicketPropertiesDialog({open,setOpen}) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  const handleClose = () => setOpen(false);

  const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

  return (
    <Dialog 
       slots={{
          transition: Transition,
        }}
      fullScreen 
      open={open}
      onClose={handleClose}>
      {/* Top Bar */}
      <AppBar sx={{ position: "relative", backgroundColor: "#f06c35" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Ticket Properties
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          {/* Header */}
          <Header>
            <div>
              <span>Request ID :</span>
              <strong style={{ marginLeft: 6 }}>84581</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label>Template</label>
              <Select size="small" defaultValue="Default Request" style={{ width: 170 }}>
                <MenuItem value="Default Request">Default Request</MenuItem>
              </Select>
            </div>
          </Header>

          {/* Main Card */}
          <Card>
            {/* Requester */}
            <Box display="flex" gap={2} mb={2.5}>
              <FormControl sx={{width:"40%"}} margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Requester</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="dummy@gmail.com">dummy@gmail.com</MenuItem>
                      <MenuItem value="dummy1@gmail.com">dummy1@gmail.com</MenuItem>
                    </Select>
                  </FormControl>
              {/* <TextField label="Requester" size="small" /> */}
              
            </Box>
              <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:'12px'}}>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Department :<span> Dept1</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Email :<span> dummy@gmail.com</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Contact :<span>9999999999</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Job Title :<span> Dummy title</span></p>
              </div>

            {/* Left + Right */}
            <Box display="flex" gap={4}>
              {/* Left */}
              <Box flex={1}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Category</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Software">Software</MenuItem>
                      <MenuItem value="Hardware">Hardware</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Subcategory</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Software">Oracle</MenuItem>
                    </Select>
                  </FormControl>
                <TextField label="Item" fullWidth margin="normal" />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Impact</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Single user">Single user</MenuItem>
                    </Select>
                  </FormControl>
                <TextField label="Site" fullWidth margin="normal" />
                <TextField label="Subject" fullWidth margin="normal" defaultValue="Oracle Access" />
              </Box>

              {/* Right */}
              <Box flex={1}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Select Priority</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Status</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Mode</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Email">Email</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Group</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Application Support">Application Support</MenuItem>
                    </Select>
                  </FormControl>
                <TextField label="Technician" fullWidth margin="normal" />
              </Box>
            </Box>

            {/* Description */}
            <Box mt={3}>
              <Typography>Description</Typography>
                <TextEditor/>
              {/* <TextField fullWidth multiline minRows={5} /> */}
            </Box>
              <Box mt={8}>
                <Selected 
                  styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: "50px",   // height of the select box
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          minHeight: "50px",   // keeps content aligned
                        }),
                        input: (provided) => ({
                          ...provided,
                          minHeight: "50px",
                        }),
                      }}
                  components={animatedComponents}  
                  isMulti 
                  options={options} 
                />
              </Box>
            {/* Dates */}
            <Box display="flex" gap={3} mt={3}>
              <Box flex={1}>
                <Typography>Created Date</Typography>
                <TextField value="Jul 1, 2025 03:10 PM" fullWidth InputProps={{ readOnly: true }} />
              </Box>
              <Box flex={1}>
                <Typography>Start Date</Typography>
                <DatePicker
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{ textField: { fullWidth: true, size: "medium" } }}
                />
              </Box>
            </Box>

            <Box display="flex" gap={3} mt={3}>
              <Box flex={1}>
                <Typography>End Date</Typography>
                <DatePicker
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{ textField: { fullWidth: true, size: "medium" } }}
                />
              </Box>
              <Box flex={1}>
                <Typography>Due By</Typography>
                <TextField value="Jul 3, 2025 03:10 PM" fullWidth InputProps={{ readOnly: true }} />
              </Box>
            </Box>

            {/* Attachments */}
            <Box mt={3} p={2} border="1px dashed #ccc" borderRadius={4} bgcolor="#fafafa">
              <Typography fontWeight="bold">Attachments</Typography>
              <label style={{ color: "#d9534f", cursor: "pointer" }}>
                Browse Files
                <input type="file" hidden />
              </label>{" "}
              or Drag files here | <span style={{ fontSize: "0.9em" }}>Max size: 50 MB.</span>
            </Box>

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button variant="contained" color="error">
                Update Request
              </Button>
              <Button variant="outlined">Reset</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Card>
        </Container>
      </LocalizationProvider>
    </Dialog>
  );
}
