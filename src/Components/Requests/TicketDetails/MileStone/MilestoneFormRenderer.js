import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function MilestoneFormRenderer() {
  // const data = [
  //   {
  //     type: "element",
  //     fields: [
  //       {
  //         id: 1757585108151,
  //         fieldtype: "text",
  //         label: "first name",
  //         visibility: "",
  //         headerId: null,
  //       },
  //     ],
  //   },
  //   {
  //     templateId: 1757585068414,
  //     type: "component",
  //     headerLabel: "dasdad",
  //     fields: [
  //       {
  //         id: 1757585093021,
  //         fieldtype: "text",
  //         label: "dasdd",
  //         visibility: "",
  //         headerId: 1757585068414,
  //       },
  //       {
  //         id: 1757585098254,
  //         fieldtype: "date",
  //         label: "date",
  //         visibility: "",
  //         headerId: 1757585068414,
  //       },
  //     ],
  //   },
  //   {
  //     templateId: 1757587194949,
  //     type: "component",
  //     headerLabel: "vendor",
  //     fields: [
  //       {
  //         id: 1757587202088,
  //         fieldtype: "text",
  //         label: "vendor name",
  //         visibility: "",
  //         headerId: 1757587194949,
  //       },
  //       {
  //         id: 1757587224019,
  //         fieldtype: "dropdown",
  //         label: "vendor selection",
  //         visibility: "",
  //         headerId: 1757587194949,
  //         options: ["opt1", "opt2", "opt3"],
  //       },
  //     ],
  //   },
  // ];
  // {
 const data= {
  "MileStone 1": [
    {
      "type": "element",
      "progressStatus":"success",
      "fields": [
        {
          "id": 1757585108151,
          "fieldtype": "text",
          "label": "first name",
          "visibility": "",
          "headerId": null
        }
      ]
    },
    {
      "templateId": 1757585068414,
      "type": "component",
      "headerLabel": "dasdad",
      "fields": [
        {
          "id": 1757585093021,
          "fieldtype": "text",
          "label": "dasdd",
          "visibility": "",
          "headerId": 1757585068414
        },
        {
          "id": 1757585098254,
          "fieldtype": "date",
          "label": "date",
          "visibility": "",
          "headerId": 1757585068414
        }
      ]
    }
  ],
  "MileStone 2": [
    {
      "type": "element",
      "progressStatus":"In Progress",
      "fields": [
        {
          "id": 1757585108151,
          "fieldtype": "text",
          "label": "first name",
          "visibility": "",
          "headerId": null
        }
      ]
    },
    {
      "templateId": 1757587194949,
      "type": "component",
      "headerLabel": "vendor",
      "fields": [
        {
          "id": 1757587202088,
          "fieldtype": "text",
          "label": "vendor name",
          "visibility": "",
          "headerId": 1757587194949
        },
        {
          "id": 1757587224019,
          "fieldtype": "dropdown",
          "label": "vendor list",
          "visibility": "",
          "headerId": 1757587194949,
          "options": ["vendor 1", "vendor 2", "vendor 3"]
        }
      ]
    }
  ],
   "MileStone 3": [
    {
      "type": "element",
      "progressStatus":"In Progress",
      "fields": [
        {
          "id": 1757585108151,
          "fieldtype": "text",
          "label": "first name",
          "visibility": "",
          "headerId": null
        }
      ]
    },
    {
      "templateId": 1757587194949,
      "type": "component",
      "headerLabel": "vendor",
      "fields": [
        {
          "id": 1757587202088,
          "fieldtype": "text",
          "label": "vendor name",
          "visibility": "",
          "headerId": 1757587194949
        },
        {
          "id": 1757587224019,
          "fieldtype": "dropdown",
          "label": "vendor list",
          "visibility": "",
          "headerId": 1757587194949,
          "options": ["vendor 1", "vendor 2", "vendor 3"]
        }
      ]
    }
  ]

 }

  const [formData, setFormData] = useState({});

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const formatted = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [
        k,
        v && v.$d ? dayjs(v).format("YYYY-MM-DD") : v,
      ])
    );
    console.log("Submitted:", formatted);
    alert("Form submitted! Check console.");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            border: "2px solid",
            borderColor: "rgba(219, 130, 79, 0.89)",
            background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
            p: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card sx={{ width: "100%", borderRadius: 3, boxShadow: "none" }}>
            <CardContent>
              {/* <Typography
                variant="h4"
                textAlign="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "rgba(219, 130, 79, 0.89)",
                  mb: 2,
                }}
              >
                Milestone Form
              </Typography> */}
              <Divider sx={{ mb: 4, borderColor: "rgba(219, 130, 79, 0.89)" }} />
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Box >
                      <FormControl sx={{ minWidth: 220 }}>
                      <InputLabel id="demo-simple-select-label">Select Template</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem value={10}>Template 1</MenuItem>
                        <MenuItem value={20}>Template 2</MenuItem>
                        <MenuItem value={30}>Template 3</MenuItem>
                      </Select>
                    </FormControl>
                    </Box>
                     
                    {Object.entries(data).map(([formKey, blocks]) => (
                      <Card
                        key={formKey}
                        sx={{ width: "100%", borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", p: 2 }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ fontWeight: "bold",  color: "rgba(219, 130, 79, 0.89)", mb: 3 }}
                          >
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                              {formKey?.toUpperCase() || ""}
                              <Chip label={blocks.map((item)=>item.progressStatus)} 
                              color={blocks.some((item)=>item.progressStatus == 'success') ? 'success':'primary'}
                              icon={<CheckCircleIcon/>}
                              variant="outlined" />   {/* shows FORM1, FORM2 etc */}
                            </div>
                            
                          </Typography>

                          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {blocks.map((block, idx) => {
                              if (block.type === "element") {
                                return block.fields.map((field) => (
                                  <Box key={field.id}>
                                    {field.fieldtype === "text" && (
                                      <TextField
                                        label={field.label}
                                        fullWidth
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        variant="outlined"
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            backgroundColor: "white",
                                          },
                                        }}
                                      />
                                    )}
                                  </Box>
                                ));
                              }

                              if (block.type === "component") {
                                return (
                                  <Box
                                    key={block.templateId || idx}
                                    sx={{
                                      border: "2px solid",
                                      borderColor: "rgba(219, 130, 79, 0.89)",
                                      borderRadius: 3,
                                      p: 3,
                                      position: "relative",
                                      backgroundColor: "white",
                                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        fontWeight: "bold",
                                        color: "rgba(219, 130, 79, 0.89)",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "-12px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "white",
                                        px: 2,
                                        borderRadius: 2,
                                      }}
                                    >
                                      {block.headerLabel}
                                    </Typography>

                                    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                                      {block.fields.map((field) => (
                                        <Box key={field.id}>
                                          {field.fieldtype === "text" && (
                                            <TextField
                                              label={field.label}
                                              fullWidth
                                              value={formData[field.id] || ""}
                                              onChange={(e) => handleChange(field.id, e.target.value)}
                                            />
                                          )}

                                          {field.fieldtype === "date" && (
                                            <DatePicker
                                              label={field.label}
                                              value={formData[field.id] || null}
                                              onChange={(newVal) => handleChange(field.id, newVal)}
                                              slotProps={{
                                                textField: {
                                                  fullWidth: true,
                                                  variant: "outlined",
                                                },
                                              }}
                                            />
                                          )}

                                          {field.fieldtype === "dropdown" && (
                                            <FormControl fullWidth>
                                              <InputLabel>{field.label}</InputLabel>
                                              <Select
                                                value={formData[field.id] || ""}
                                                onChange={(e) => handleChange(field.id, e.target.value)}
                                              >
                                                {(field.options || []).map((opt, i) => (
                                                  <MenuItem key={i} value={opt}>
                                                    {opt}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                          )}
                                        </Box>
                                      ))}
                                    </Box>
                                  </Box>
                                );
                              }

                              return null;
                            })}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1.1rem",
                  fontWeight: "medium",
                  backgroundColor: "rgba(219, 130, 79, 0.89)",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Submit Form
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}