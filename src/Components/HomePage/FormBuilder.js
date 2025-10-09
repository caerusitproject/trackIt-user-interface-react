import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  AppBar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Grid,
  Button,
  Tooltip,
  Divider,
  Chip,
  Alert,
  useTheme,
  useMediaQuery,
  Slider
} from "@mui/material";
import {
  Delete,
  ArrowUpward,
  ArrowDownward,
  TextFields,
  Email,
  CalendarToday,
  Description,
  ListAlt,
  Add,
  Dashboard,
  Settings,
  Visibility,
  ContentCopy,
  LibraryAdd,
  AspectRatio,
  ViewColumn,
  ViewStream
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DialogueFormBuilder from "./DialogueFormBuilder";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#ec4899',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});

const fieldTypes = [
  { type: "Text", icon: <TextFields />, color: "#3b82f6" },
  { type: "Email", icon: <Email />, color: "#ec4899" },
  { type: "Textarea", icon: <Description />, color: "#10b981" },
  { type: "Select", icon: <ListAlt />, color: "#f59e0b" },
  { type: "Date", icon: <CalendarToday />, color: "#8b5cf6" },
];

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [currentTemplateFields, setCurrentTemplateFields] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [copiedFieldId, setCopiedFieldId] = useState(null);
  const [formLayout, setFormLayout] = useState({
    direction: "column",
    spacing: 2,
    alignItems: "stretch"
  });
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Add field with default layout configuration
  const addField = (type, toTemplate = false) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type} Field`,
      required: false,
      placeholder: `Enter ${type.toLowerCase()}`,
      options: type === "Select" ? ["Option 1", "Option 2"] : [],
      layout: {
        width: "100%",
        flex: 1,
        direction: "vertical"
      }
    };
    
    if (toTemplate) {
      setCurrentTemplateFields([...currentTemplateFields, newField]);
    } else {
      setFields([...fields, newField]);
      setSelectedField(newField);
    }
  };

  // Duplicate field
  const duplicateField = (field) => {
    const duplicatedField = {
      ...field,
      id: Date.now(),
      label: `${field.label} (Copy)`
    };
    setFields([...fields, duplicatedField]);
    setSelectedField(duplicatedField);
    setCopiedFieldId(duplicatedField.id);
    setTimeout(() => setCopiedFieldId(null), 2000);
  };

  // Update field config
  const updateField = (key, value) => {
    const updated = fields.map((f) =>
      f.id === selectedField.id ? { ...f, [key]: value } : f
    );
    setFields(updated);
    setSelectedField({ ...selectedField, [key]: value });
  };

  // Update field layout
  const updateFieldLayout = (key, value) => {
    const updated = fields.map((f) =>
      f.id === selectedField.id 
        ? { 
            ...f, 
            layout: { ...f.layout, [key]: value } 
          } 
        : f
    );
    setFields(updated);
    setSelectedField({ 
      ...selectedField, 
      layout: { ...selectedField.layout, [key]: value } 
    });
  };

  // Remove field
  const removeField = (id) => {
    const updated = fields.filter(f => f.id !== id);
    setFields(updated);
    if (selectedField && selectedField.id === id) {
      setSelectedField(updated.length > 0 ? updated[0] : null);
    }
  };

  // Move field up/down
  const moveField = (index, direction) => {
    const updated = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];
    setFields(updated);
  };

  // Render field input based on type
  const renderFieldInput = (field) => {
    const commonProps = {
      fullWidth: true,
      size: "small",
      placeholder: field.placeholder,
      disabled: true,
      variant: "outlined"
    };

    switch (field.type) {
      case "Text":
        return <TextField {...commonProps} />;
      case "Email":
        return <TextField {...commonProps} type="email" />;
      case "Textarea":
        return <TextField {...commonProps} multiline rows={3} />;
      case "Select":
        return (
          <FormControl fullWidth size="small">
            <Select {...commonProps} value="">
              {field.options?.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "Date":
        return <TextField {...commonProps} type="date" InputLabelProps={{ shrink: true }} />;
      default:
        return <TextField {...commonProps} />;
    }
  };

  // Flexible grouping logic that supports 2 or 3 fields per row based on widths
  const groupFieldsByRow = (fields) => {
    const groups = [];
    let currentGroup = [];
    let currentRowWidth = 0;
    
    fields.forEach((field, index) => {
      const isHorizontal = field.layout?.direction === "horizontal";
      const fieldWidth = field.layout?.width || "100%";
      
      // Calculate approximate width percentage
      let widthPercent = 100;
      if (fieldWidth.includes('%')) {
        widthPercent = parseInt(fieldWidth);
      } else if (fieldWidth === 'auto') {
        widthPercent = 100; // Auto takes full available space
      }
      
      if (isHorizontal) {
        // Check if adding this field would exceed 100% width (with some tolerance)
        if (currentRowWidth + widthPercent <= 110) { // 110% tolerance for gaps
          currentGroup.push(field);
          currentRowWidth += widthPercent;
        } else {
          // Start new row
          if (currentGroup.length > 0) {
            groups.push(currentGroup);
          }
          currentGroup = [field];
          currentRowWidth = widthPercent;
        }
      } else {
        // Vertical field - push current group and start new one
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
          currentGroup = [];
          currentRowWidth = 0;
        }
        groups.push([field]);
      }
    });
    
    // Push any remaining fields in current group
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  // Get container style based on form layout
  const getFormContainerStyle = () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: formLayout.spacing,
    minWidth: 'max-content'
  });

  // Get field style based on field layout
  const getFieldStyle = (field) => ({
    flex: '0 0 auto',
    width: field.layout?.width || '100%',
    minWidth: field.layout?.width || '100%',
    boxSizing: 'border-box'
  });

  // Get row container style for horizontal fields
  const getRowContainerStyle = () => ({
    display: 'flex',
    flexDirection: 'row',
    gap: formLayout.spacing,
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    width: '100%',
    minWidth: 'max-content',
    overflow: 'visible'
  });

  const fieldGroups = groupFieldsByRow(fields);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        p: { xs: 1, md: 2 }, 
        backgroundColor: 'background.default', 
        minHeight: '100vh',
        overflow: 'auto'
      }}>
        <Paper 
          elevation={2} 
          sx={{ 
            overflow: 'visible',
            borderRadius: 3
          }}
        >
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#ec9531ff', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Dashboard sx={{ fontSize: 28 }} />
            <Typography variant="h5" fontWeight="600">
              Form Builder
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            height: { md: 'calc(100vh - 160px)' },
            overflow: 'hidden'
          }}>
            {/* Left Panel → Field Library */}
            <Box sx={{ 
              width: { xs: '100%', md: 280 }, 
              flexShrink: 0,
              p: 2,
              borderRight: { md: '1px solid #e2e8f0' },
              backgroundColor: 'white',
              overflow: 'auto'
            }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LibraryAdd /> Field Library
              </Typography>
              
              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                {fieldTypes.map((field) => (
                  <Grid item xs={6} key={field.type}>
                    <Tooltip title={`Add ${field.type} field`}>
                      <Card
                        onClick={() => addField(field.type)}
                        sx={{
                          p: 1.5,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: '0.2s',
                          border: '1px solid #e2e8f0',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 3,
                            borderColor: field.color
                          }
                        }}
                      >
                        <Box sx={{ color: field.color, fontSize: 28, mb: 0.5 }}>
                          {field.icon}
                        </Box>
                        <Typography variant="body2" fontWeight="500">
                          {field.type}
                        </Typography>
                      </Card>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Spacing: {formLayout.spacing}
                </Typography>
                <Slider
                  value={formLayout.spacing}
                  onChange={(e, newValue) => setFormLayout({...formLayout, spacing: newValue})}
                  min={0}
                  max={8}
                  step={1}
                  size="small"
                />
              </Box>

              <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
                Supports 2 or 3 fields per row based on width settings
              </Alert>
              
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<ContentCopy />}
                onClick={() => setTemplateModalOpen(true)}
                sx={{ mb: 2 }}
              >
                Templates
              </Button>
              
              {fields.length > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={() => {
                    setFields([]);
                    setSelectedField(null);
                  }}
                >
                  Clear All
                </Button>
              )}
            </Box>

            {/* Middle Panel → Form Preview */}
            <Box sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflow: 'auto',
              backgroundColor: '#f8fafc'
            }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Visibility /> Form Configuration
              </Typography>
              
              <Paper sx={{ 
                p: 3, 
                backgroundColor: 'white',
                minHeight: 300,
                overflow: 'visible',
                minWidth: 'min-content'
              }}>
                {fields.length === 0 ? (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    color: 'text.secondary'
                  }}>
                    <Typography variant="h6" gutterBottom>
                      No fields added yet
                    </Typography>
                    <Typography variant="body2">
                      Drag fields from the library or use templates to get started
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={getFormContainerStyle()}>
                    {fieldGroups.map((group, groupIndex) => (
                      <Box 
                        key={groupIndex}
                        sx={group.length > 1 ? getRowContainerStyle() : { width: '100%' }}
                      >
                        {group.map((field, fieldIndex) => {
                          const actualIndex = fields.findIndex(f => f.id === field.id);
                          return (
                            <Box 
                              key={field.id} 
                              onClick={() => setSelectedField(field)}
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                border: '2px solid',
                                borderColor: selectedField?.id === field.id ? 'primary.main' : 'transparent',
                                backgroundColor: selectedField?.id === field.id ? '#f0f9ff' : 'transparent',
                                transition: '0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#f8fafc'
                                },
                                ...getFieldStyle(field)
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="subtitle1" fontWeight="500">
                                  {field.label} {field.required && <span style={{color: '#ef4444'}}>*</span>}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {field.layout?.direction === "horizontal" && (
                                    <Chip 
                                      label="Sideways" 
                                      size="small" 
                                      color="primary" 
                                      variant="outlined"
                                      sx={{ fontSize: '0.6rem', height: 20 }} 
                                    />
                                  )}
                                  <Chip 
                                    label={field.type} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ fontSize: '0.7rem', height: 24 }} 
                                  />
                                </Box>
                              </Box>
                              
                              {renderFieldInput(field)}
                              
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5, mt: 1 }}>
                                <Tooltip title="Move up">
                                  <span>
                                    <IconButton 
                                      size="small" 
                                      disabled={actualIndex === 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveField(actualIndex, "up");
                                      }}
                                    >
                                      <ArrowUpward fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                                <Tooltip title="Move down">
                                  <span>
                                    <IconButton 
                                      size="small" 
                                      disabled={actualIndex === fields.length - 1}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveField(actualIndex, "down");
                                      }}
                                    >
                                      <ArrowDownward fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                                <Tooltip title="Duplicate">
                                  <IconButton 
                                    size="small" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      duplicateField(field);
                                    }}
                                  >
                                    <ContentCopy fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton 
                                    size="small" 
                                    color="error"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeField(field.id);
                                    }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              
                              {copiedFieldId === field.id && (
                                <Alert severity="success" sx={{ mt: 1, py: 0 }}>
                                  Field duplicated
                                </Alert>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    ))}
                    
                    <Button 
                      variant="contained" 
                      color="success" 
                      fullWidth 
                      size="large"
                      sx={{ mt: 2, flex: '0 0 auto' }}
                    >
                      Submit Form
                    </Button>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Right Panel → Field Configuration */}
            <Box sx={{ 
              width: { xs: '100%', md: 320 }, 
              flexShrink: 0,
              p: 2,
              borderLeft: { md: '1px solid #e2e8f0' },
              backgroundColor: 'white',
              overflow: 'auto'
            }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings /> Individual Field Configurer
              </Typography>
              
              {selectedField ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Label"
                    value={selectedField.label}
                    onChange={(e) => updateField("label", e.target.value)}
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Placeholder"
                    value={selectedField.placeholder}
                    onChange={(e) => updateField("placeholder", e.target.value)}
                    margin="normal"
                    size="small"
                  />
                  
                  {/* Field Layout Configuration */}
                  <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AspectRatio /> Field Layout
                  </Typography>

                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Field Direction</InputLabel>
                    <Select
                      value={selectedField.layout?.direction || "vertical"}
                      onChange={(e) => updateFieldLayout("direction", e.target.value)}
                      label="Field Direction"
                    >
                      <MenuItem value="vertical">Vertical (Stacked)</MenuItem>
                      <MenuItem value="horizontal">Horizontal (Sideways)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Width</InputLabel>
                    <Select
                      value={selectedField.layout?.width || "100%"}
                      onChange={(e) => updateFieldLayout("width", e.target.value)}
                      label="Width"
                    >
                      <MenuItem value="100%">Full Width</MenuItem>
                      <MenuItem value="75%">75% Width</MenuItem>
                      <MenuItem value="50%">Half Width</MenuItem>
                      <MenuItem value="33%">One Third</MenuItem>
                      <MenuItem value="25%">Quarter Width</MenuItem>
                      <MenuItem value="auto">Auto</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Flex Grow: {selectedField.layout?.flex || 1}
                    </Typography>
                    <Slider
                      value={selectedField.layout?.flex || 1}
                      onChange={(e, newValue) => updateFieldLayout("flex", newValue)}
                      min={0}
                      max={5}
                      step={1}
                      size="small"
                    />
                  </Box>

                  <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
                    <strong>Layout Tips:</strong>
                    <br />• 50% width = 2 fields per row
                    <br />• 33% width = 3 fields per row  
                    <br />• 25% width = 4 fields per row
                  </Alert>
                  
                  {selectedField.type === "Select" && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Options (one per line)
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={selectedField.options.join("\n")}
                        onChange={(e) => updateField("options", e.target.value.split("\n"))}
                        size="small"
                      />
                    </Box>
                  )}
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedField.required}
                        onChange={(e) => updateField("required", e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Required field"
                    sx={{ mt: 2 }}
                  />
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => removeField(selectedField.id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ContentCopy />}
                      onClick={() => duplicateField(selectedField)}
                      fullWidth
                    >
                      Duplicate
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  color: 'text.secondary'
                }}>
                  <Settings sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
                  <Typography>
                    Select a field to configure
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Template Manager Modal - */}
        <DialogueFormBuilder
          fieldTypes={fieldTypes}
          open={templateModalOpen}
          setTemplateModalOpen={setTemplateModalOpen}
          fields={fields}
          setFields={setFields}
          currentTemplateFields={currentTemplateFields}
          setCurrentTemplateFields={setCurrentTemplateFields}
          templates={templates}
          setTemplates={setTemplates}
          templateName={templateName}
          setTemplateName={setTemplateName}
          renderFieldInput={renderFieldInput}
        />
      </Box>
    </ThemeProvider>
  );
}