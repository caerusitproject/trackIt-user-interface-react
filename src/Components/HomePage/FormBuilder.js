import React, { useState } from "react";
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

export default function DynamicFormBuilder() {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [pendingType, setPendingType] = useState(null);
  const [fieldLabel, setFieldLabel] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [pendingHeaderId, setPendingHeaderId] = useState(null);

  const handleAddFieldClick = (type, headerId = null) => {
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
      type: pendingType,
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

  const handleSubmit = () => {
    // Format form data for submission
    const formatted = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [
        k,
        v && v.$d ? dayjs(v).format("YYYY-MM-DD") : v,
      ])
    );

    // Group fields by headers for submission output
    const headers = fields.filter((field) => field.type === "header");
    const groupedFields = headers.map((header) => ({
      header: header.label,
      fields: fields
        .filter((field) => field.headerId === header.id && field.type !== "header")
        .map((field) => ({
          label: field.label,
          value: formatted[field.id] || "",
        })),
    }));
    const ungroupedFields = fields
      .filter((field) => !field.headerId && field.type !== "header")
      .map((field) => ({
        label: field.label,
        value: formatted[field.id] || "",
      }));

    // Construct submission output
    let output = `Form "${templateName}" Submitted!\n\n`;
    if (groupedFields.length > 0) {
      output += "Header Fields:\n";
      groupedFields.forEach((group) => {
        output += `  ${group.header}:\n`;
        group.fields.forEach((field) => {
          output += `    ${field.label}: ${field.value}\n`;
        });
      });
    }
    if (ungroupedFields.length > 0) {
      output += "\nNon-Header Fields:\n";
      ungroupedFields.forEach((field) => {
        output += `  ${field.label}: ${field.value}\n`;
      });
    }

    alert(output);
  };

  // Group fields by headers for rendering
  const headers = fields.filter((field) => field.type === "header");
  const groupedFields = headers.map((header) => ({
    header,
    fields: fields.filter((field) => field.headerId === header.id && field.type !== "header"),
  }));
  const ungroupedFields = fields.filter((field) => !field.headerId && field.type !== "header");

  console.log('group and ungroup fields___',groupedFields,
ungroupedFields)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          p: 4,
          flexWrap: "wrap",
        }}
      >
        {/* === Field Palette === */}
        <Card sx={{ width: 320, borderRadius: 4 }} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Field Palette
            </Typography>
            <Divider sx={{ mb: 2 }} />
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
              {headers.map((header) => (
                <Box key={header.id} sx={{ pl: 2 }}>
                  <Typography variant="subtitle2">{header.label}</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pl: 2 }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddFieldClick("text", header.id)}
                    >
                      + Text Field
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddFieldClick("date", header.id)}
                    >
                      + Date Picker
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddFieldClick("dropdown", header.id)}
                    >
                      + Dropdown
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddFieldClick("contact", header.id)}
                    >
                      + Contact Number
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* === Preview Form === */}
        <Card sx={{ width: 320, borderRadius: 4 }} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Preview Form
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              label="Form Template Name"
              fullWidth
              sx={{ mb: 2 }}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              {ungroupedFields.map((field) => (
                <Box key={field.id}>
                  {field.type === "text" && (
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
                  )}
                  {field.type === "date" && (
                    <DatePicker
                      label={field.label}
                      value={formData[field.id] || null}
                      onChange={(newVal) => handleChange(field.id, newVal)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  )}
                  {field.type === "contact" && (
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
                  )}
                  {field.type === "dropdown" && (
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
              {groupedFields.map(({ header, fields }) => (
                <Box key={header.id}>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {header.label}
                  </Typography>
                  {fields.map((field) => (
                    <Box key={field.id} sx={{ mt: 1 }}>
                      {field.type === "text" && (
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
                      )}
                      {field.type === "date" && (
                        <DatePicker
                          label={field.label}
                          value={formData[field.id] || null}
                          onChange={(newVal) => handleChange(field.id, newVal)}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )}
                      {field.type === "contact" && (
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
                      )}
                      {field.type === "dropdown" && (
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
              ))}
           
            </Box>

            {fields.length > 0 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                fullWidth
              >
                Submit Form
              </Button>
            )}
          </CardContent>
        </Card>

        {/* === Config Panel === */}
        <Card sx={{ width: 320, borderRadius: 4 }} elevation={2}>
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
    </LocalizationProvider>
  );
}