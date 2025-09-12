import React, { useState } from "react";
import './sidebar.css';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';


export default function DynamicFormBuilder() {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [pendingType, setPendingType] = useState(null);
  const [fieldLabel, setFieldLabel] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [pendingHeaderId, setPendingHeaderId] = useState(null);
  const [savedTemplates, setSavedTemplates] = useState([]);

  const [groupedCountFields, setGroupedCountFields] = useState(0);
  const [grouping, setGrouping] = useState({
    groupFields:[],ungroupFields:[]
  })

  React.useEffect(() => {
  const headers = fields.filter((field) => field.fieldtype === "header");

  const groupedFields = headers.map((header) => ({
    header,
    fields: fields.filter(
      (field) => field.headerId === header.id && field.fieldtype !== "header"
    ),
  }));

  const ungroupedFields = fields.filter(
    (field) => !field.headerId && field.fieldtype !== "header"
  );

  setGrouping({...grouping,groupFields: groupedFields,ungroupFields: ungroupedFields });
}, [fields]);


  const handleAddFieldClick = (type, headerId = null,groupedStatus) => {
    setPendingType(type);
    setFieldLabel("");
    setDropdownOptions("");
    setVisibilityType("");
    setPendingHeaderId(headerId);
  };

  const handleConfirmAdd = () => {
    if (!fieldLabel.trim()) return;

    const newField = {
      id: Date.now(),
      fieldtype: pendingType,
      label: fieldLabel,
      visibility: visibilityType,
      headerId: pendingType === "header" ? null : pendingHeaderId,
    };

    if (pendingType === "dropdown") {
      newField.options = dropdownOptions
        .split(",")
        .map((opt) => opt.trim())
        .filter(Boolean);
    }

    setFields([...fields, newField]);
    setPendingType(null);
    setPendingHeaderId(null);
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleDelete = (id)=>{
    const index=fields.findIndex((ele)=> ele.id == id);
    fields.splice(index,1);
    setFields([...fields])
  }

  const handleDeleteGroupedFields = (fieldId, headerId) => {
  // Remove the grouped field
  const updatedFields = fields.filter((f) => f.id !== fieldId);

  // Check if header has any children left
  const hasChildren = updatedFields.some(
    (f) => f.headerId === headerId && f.fieldtype !== "header"
  );

  let finalFields = [...updatedFields];
  if (!hasChildren) {
    // Remove the header itself
    finalFields = finalFields.filter((f) => f.id !== headerId);
  }

  setFields(finalFields);
};


  const handleSubmit = () => {
  let dumpArr = []
  const headers = fields.filter((field) => field.fieldtype === "header");
  const groupedFields = headers.map((header) => ({
    templateId: header.id,
    type: 'component' ,
    headerLabel: header.label,
    fields: fields.filter((field) => field.headerId === header.id && field.type !== "header"),
  }));

   const ungroupedFields = fields
    .filter((field) => field.headerId == null && field.fieldtype !== "header")
    .map((item)=>({
      ...item
    }))
    dumpArr.push({
      type:'element',
      fields:ungroupedFields,
      // ...groupedFields[0]
    })
    let dumpArr1=[...dumpArr,...groupedFields]
  // Save each grouped section as a template
  // setSavedTemplates((prev) => [
  //   ...prev,
  //   ...groupedFields.map((g) => ({
  //     id: Date.now() + Math.random(),
  //     name: g.headerLabel, // Vendor name or header label
  //     header: g.headerLabel,
  //     fields: g.fields,
  //   })),
  // ]);

  console.log("Saved templates:",
dumpArr1);

  // alert("Templates saved!");
};

const handleSaveTemplate = (headerId) => {
  const header = fields.find((f) => f.id === headerId && f.fieldtype === "header");
  if (!header) return;

  const groupFields = fields.filter(
    (f) => f.headerId === headerId && f.fieldtype !== "header"
  );

  const newTemplate = {
    id: Date.now() + Math.random(),
    name: header.label,   // Template name = header label
    header: header.label,
    fields: groupFields,
  };

  setSavedTemplates((prev) => [...prev, newTemplate]);

  alert(`Template "${header.label}" saved!`);
};


  // const handleSubmit = () => {
  //   // Format form data for submission
  //   const formatted = Object.fromEntries(
  //     Object.entries(formData).map(([k, v]) => [
  //       k,
  //       v && v.$d ? dayjs(v).format("YYYY-MM-DD") : v,
  //     ])
  //   );

  //   // Group fields by headers for submission output
  //   const headers = fields.filter((field) => field.type === "header");
  //   const groupedFields = headers.map((header) => ({
  //     header: header.label,
  //     fields: fields
  //       .filter((field) => field.headerId === header.id && field.type !== "header")
  //   }));
  //   const ungroupedFields = fields
  //     .filter((field) => field.headerId == null && field.type !== "header");
    

  //   // Construct submission output
  //   console.log('output____',groupedFields,ungroupedFields,fields);
  // };
  
const headers = fields.filter((field) => field.fieldtype === "header");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={6}>
          <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          p: 4,
          flexWrap: "wrap",
        }}
      >
         <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Saved Template</InputLabel>
            <Select
              onChange={(e) => {
                const selectedTemplate = savedTemplates.find((t) => t.id === e.target.value);
                if (selectedTemplate) {
                  // create a new header + fields with fresh IDs
                  const newHeaderId = Date.now();
                  const newHeader = {
                    id: newHeaderId,
                    fieldtype: "header",
                    // type: "header",
                    label: selectedTemplate.header,
                  };

                  const newFields = selectedTemplate.fields.map((f) => ({
                    ...f,
                    id: Date.now() + Math.random(),
                    headerId: newHeaderId,
                  }));

                  setFields((prev) => [...prev, newHeader, ...newFields]);
                }
              }}
            >
              {savedTemplates.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        {/* === Field Palette === */}
        <Card sx={{ width: 410, borderRadius: 4 }} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Field Palette
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{fontSize:'22px',color:'rgba(122, 122, 121, 0.89)',mb:1,p:0.5}}>Building Elements:</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Icon icon="mdi:text" />}
                onClick={() => handleAddFieldClick("text")}
              >
                Text Field
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="mdi:calendar" />}
                onClick={() => handleAddFieldClick("date")}
              >
                Date Picker
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="mdi:form-dropdown" />}
                onClick={() => handleAddFieldClick("dropdown")}
              >
                Dropdown
              </Button>
              <Button
                variant="outlined"
                startIcon={<ContactPageIcon />}
                onClick={() => handleAddFieldClick("contact")}
              >
                Contact Number
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="mdi:header" />}
                onClick={() => handleAddFieldClick("header")}
              >
                Header
              </Button>
               <Typography sx={{fontSize:'22px',color:'rgba(122, 122, 121, 0.89)'}}>Building Templates:</Typography>
              {headers.map((header) => (
                <Box key={header.id} sx={{ pl: 2 }}>
                  <Typography variant="subtitle2">{header.label}</Typography>
                  <Box sx={{ display: "flex",justifyContent:"center", flexDirection: "column", gap: 1, pl: 2 }}>
                     <Chip
                         label="Text Field"
                         onClick={() => handleAddFieldClick("text", header.id,"grouped")}
                         icon={<TextSnippetIcon />}
                         
                      />

                       <Chip
                         label="Date Picker"
                         onClick={() => handleAddFieldClick("date", header.id,"grouped")}
                         icon={<CalendarMonthIcon />}
                      />
                      
                      <Chip
                         label="Drop Down"
                         onClick={() => handleAddFieldClick("dropdown", header.id,"grouped")}
                         icon={<ArrowDropDownCircleIcon />}
                      />
                      
                     <Chip
                         label="Contact Number"
                         onClick={() => handleAddFieldClick("contact", header.id,"grouped")}
                         icon={<ContactPhoneIcon />}
                      />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* === Preview Form === */}
        <Card sx={{ width: 410, borderRadius: 4 }} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Preview Form
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              label="Template Name"
              fullWidth
              sx={{ mb: 2 }}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />

            <Box sx={{ display: "flex",justifyContent:"center", flexDirection: "column", gap: 2, mb: 3 }}>
             
              {grouping.ungroupFields.map((field) => (
                <Box key={field.id}
                sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",  // centers horizontally
                      gap: 1,
                      mt: 1,
                    }}
                >
                  {field.fieldtype === "text" && (
                    <>
                    <TextField
                      label={field.label}
                      fullWidth
                      disabled={field.visibility === "disabled"}
                      slotProps={{
                        input: {
                          readOnly: field.visibility === "read-only",
                        },
                      }}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                    <IconButton 
                       onClick={(e)=>handleDelete(field.id)}
                     >
                    <DeleteIcon />
                    </IconButton>
                    </>
                  )}
                  {field.fieldtype === "date" && (
                    <>
                    <DatePicker
                      label={field.label}
                      value={formData[field.id] || null}
                      onChange={(newVal) => handleChange(field.id, newVal)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                     <IconButton 
                       onClick={(e)=>handleDelete(field.id)}
                     >
                    <DeleteIcon />
                    </IconButton>
                     </>
                  )}
                  {field.fieldtype === "contact" && (
                    <>
                    <TextField
                      label={field.label}
                      type="number"
                      fullWidth
                      disabled={field.visibility === "disabled"}
                      slotProps={{
                        input: {
                          readOnly: field.visibility === "read-only",
                        },
                      }}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                     />
                    <IconButton 
                      onClick={(e)=>handleDelete(field.id)}
                     >
                      <DeleteIcon />
                    </IconButton>
                    </>
                  )}
                  {field.fieldtype === "dropdown" && (
                    <div sx={{display:'flex',justifyContent:"center",flexDirection:"row"}}>
                    <FormControl>
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
                     <IconButton 
                       onClick={(e)=>handleDelete(field.id)}
                     >
                      <DeleteIcon />
                    </IconButton>
                    </FormControl>
                    </div>
                  )}
                </Box>
              ))}
              {grouping.groupFields.map(({ header, fields }) => (
                        <Box
                          key={header.id}
                          sx={{
                            border: '2px solid',
                            borderColor: "rgba(235, 137, 81, 0.89)",
                            borderRadius: '8px',
                            p: 2,
                            mb: 2,
                            position: 'relative',
                            backgroundColor: 'background.paper',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              color: "rgba(219, 130, 79, 0.89)",
                              textAlign: 'center',
                              position: 'absolute',
                              top: '-12px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: 'background.paper',
                              px: 1,
                            }}
                          >
                            {header.label}
                          </Typography>
                          {fields && fields.length > 0 &&
                          <IconButton
                              variant="outlined"
                                size="small"
                                onClick={() => handleSaveTemplate(header.id)}
                                sx={{ mt: 1 }}
                          >
                              <SaveIcon />

                          </IconButton>
                              
                          }
                          

                          <Box sx={{ mt: 2, pl: 1, pr: 1 }}>
                            {fields.map((field) => (
                              <Box
                                key={field.id}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  mt: 1,
                                }}
                              >
                                {field.fieldtype === "text" && (
                                  <div style={{display:'flex',justifyContent:'center'}}>
                                    <div>
                                    <TextField
                                      label={field.label}
                                      fullWidth
                                      disabled={field.visibility === "disabled"}
                                      slotProps={{
                                        input: {
                                          readOnly: field.visibility === "read-only",
                                        },
                                      }}
                                      value={formData[field.id] || ""}
                                      onChange={(e) => handleChange(field.id, e.target.value)}
                                    />
                                    </div>
                                    <div>

                                    <IconButton
                                      onClick={(e) => {
                                        // setGroupedCountFields((prev) => prev - 1);
                                        handleDeleteGroupedFields(field.id, header.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                    </div>
                                  </div>
                                )}
                                {field.fieldtype === "date" && (
                                  <>
                                    <DatePicker
                                      label={field.label}
                                      value={formData[field.id] || null}
                                      onChange={(newVal) => handleChange(field.id, newVal)}
                                      slotProps={{ textField: { fullWidth: true } }}
                                    />
                                    <IconButton
                                      onClick={(e) => {
                                        // setGroupedCountFields((prev) => prev - 1);
                                        handleDeleteGroupedFields(field.id, header.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </>
                                )}
                                {field.fieldtype === "contact" && (
                                  <>
                                    <TextField
                                      label={field.label}
                                      type="number"
                                      fullWidth
                                      disabled={field.visibility === "disabled"}
                                      slotProps={{
                                        input: {
                                          readOnly: field.visibility === "read-only",
                                        },
                                      }}
                                      value={formData[field.id] || ""}
                                      onChange={(e) => handleChange(field.id, e.target.value)}
                                    />
                                    <IconButton
                                      onClick={(e) => {
                                        e.preventDefault();
                                        // setGroupedCountFields((prev) => prev - 1);
                                        handleDeleteGroupedFields(field.id, header.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </>
                                )}
                                {field.fieldtype === "dropdown" && (
                                  <>
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
                                    <IconButton
                                      onClick={(e) => {
                                        // setGroupedCountFields((prev) => prev - 1);
                                        handleDeleteGroupedFields(field.id, header.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </>
                                )}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                ))}  
            </Box>

            {fields.length > 0 && (
              <Button
                variant="contained"
                sx={{color:"white",background:"rgba(241, 125, 58, 0.89)"}}
                onClick={handleSubmit}
                fullWidth
              >
                Submit Form
              </Button>
            )}
          </CardContent>
        </Card>

        {/* === Config Panel === */}
        <Card sx={{ width: 410, borderRadius: 4 }} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              {pendingType
                ? `Configure ${pendingType.charAt(0).toUpperCase() + pendingType.slice(1)}`
                : "Select a Field"}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {pendingType ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label={pendingType === "header" ? "Header Text" : "Field Label"}
                  fullWidth
                  value={fieldLabel}
                  onChange={(e) => setFieldLabel(e.target.value)}
                />
                {pendingType !== "header" && (
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Visibility Type</FormLabel>
                    <RadioGroup
                      row
                      onChange={(e) => setVisibilityType(e.target.value)}
                    >
                      <FormControlLabel value="read-only" control={<Radio />} label="Read Only" />
                      <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
                    </RadioGroup>
                  </FormControl>
                )}
                {pendingType === "dropdown" && (
                  <TextField
                    label="Dropdown Options (comma separated)"
                    fullWidth
                    value={dropdownOptions}
                    onChange={(e) => setDropdownOptions(e.target.value)}
                  />
                )}
                <Button
                  variant="contained"
                  onClick={handleConfirmAdd}
                  disabled={!fieldLabel.trim()}
                >
                  Add to Form
                </Button>
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
              >
                Choose a field type from the palette to configure
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      </Paper>
      
    </LocalizationProvider>
  );
}