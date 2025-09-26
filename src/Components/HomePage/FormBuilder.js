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
  useMediaQuery
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
  LibraryAdd
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [copiedFieldId, setCopiedFieldId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Add field
  const addField = (type, toTemplate = false) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type} Field`,
      required: false,
      placeholder: `Enter ${type.toLowerCase()}`,
      options: type === "Select" ? ["Option 1", "Option 2"] : [],
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

  // Update template field
  const updateTemplateField = (index, key, value) => {
    const updated = [...currentTemplateFields];
    updated[index] = { ...updated[index], [key]: value };
    setCurrentTemplateFields(updated);
  };

  // Remove field
  const removeField = (id) => {
    const updated = fields.filter(f => f.id !== id);
    setFields(updated);
    if (selectedField && selectedField.id === id) {
      setSelectedField(updated.length > 0 ? updated[0] : null);
    }
  };

  // Remove template field
  const removeTemplateField = (index) => {
    const updated = [...currentTemplateFields];
    updated.splice(index, 1);
    setCurrentTemplateFields(updated);
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

  console.log('submit form____',fields)

  // Move template field up/down
  const moveTemplateField = (index, direction) => {
    const updated = [...currentTemplateFields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];
    setCurrentTemplateFields(updated);
  };

  // Save template
  const saveTemplate = () => {
    if (!templateName.trim() || currentTemplateFields.length === 0) return;
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      fields: currentTemplateFields,
      createdAt: new Date().toLocaleString(),
    };
    setTemplates([...templates, newTemplate]);
    setCurrentTemplateFields([]);
    setTemplateName("");
    setActiveTemplateTab(0);
  };

  // Add template to form
  const addTemplateToForm = (template) => {
    const fieldsWithNewIds = template.fields.map(field => ({
      ...field,
      id: Date.now() + Math.random()
    }));
    setFields([...fields, ...fieldsWithNewIds]);
    setTemplateModalOpen(false);
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        p: { xs: 1, md: 2 }, 
        backgroundColor: 'background.default', 
        minHeight: '100vh' 
      }}>
        <Paper 
          elevation={2} 
          sx={{ 
            overflow: 'hidden',
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
                minHeight: 300
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
                  <Box>
                    {fields.map((field, index) => (
                      <Box 
                        key={field.id} 
                        onClick={() => setSelectedField(field)}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          border: '2px solid',
                          borderColor: selectedField?.id === field.id ? 'primary.main' : 'transparent',
                          backgroundColor: selectedField?.id === field.id ? '#f0f9ff' : 'transparent',
                          transition: '0.2s',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#f8fafc'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="500">
                            {field.label} {field.required && <span style={{color: '#ef4444'}}>*</span>}
                          </Typography>
                          <Chip 
                            label={field.type} 
                            size="small" 
                            variant="outlined" 
                            sx={{ fontSize: '0.7rem', height: 24 }} 
                          />
                        </Box>
                        
                        {renderFieldInput(field)}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5, mt: 1 }}>
                          <Tooltip title="Move up">
                            <span>
                              <IconButton 
                                size="small" 
                                disabled={index === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveField(index, "up");
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
                                disabled={index === fields.length - 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveField(index, "down");
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
                    ))}
                    
                    <Button 
                      variant="contained" 
                      color="success" 
                      fullWidth 
                      size="large"
                      sx={{ mt: 2 }}
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

        {/* Template Manager Modal */}
        <Dialog
          open={templateModalOpen}
          onClose={() => setTemplateModalOpen(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{ sx: { borderRadius: 3 } }}
        >
          <DialogTitle sx={{ 
            backgroundColor: '#ec9531ff', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <ContentCopy /> Template Manager
          </DialogTitle>
          
          <AppBar position="static" color="default" elevation={1}>
            <Tabs
              value={activeTemplateTab}
              onChange={(e, v) => setActiveTemplateTab(v)}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Saved Templates" />
              <Tab label="Build Template" />
            </Tabs>
          </AppBar>
          
          <DialogContent sx={{ p: 3 }}>
            {/* Saved Templates */}
            {activeTemplateTab === 0 && (
              <Box>
                {templates.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <ContentCopy sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
                    <Typography>No templates saved yet</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {templates.map((t) => (
                      <Grid item xs={12} md={6} key={t.id}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            p: 2,
                            transition: '0.2s',
                            '&:hover': {
                              boxShadow: 2,
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                            {t.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            {t.fields.length} fields · Created {t.createdAt}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => addTemplateToForm(t)}
                            fullWidth
                            sx={{ mt: 1 , backgroundColor:"#ec9531ff"}}
                          >
                            Add to Form
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* Build Template */}
            {activeTemplateTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" fontWeight="500">
                    Build Template
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => {
                      setCurrentTemplateFields([
                        ...currentTemplateFields,
                        { id: Date.now(), label: "", type: "Text", required: false, placeholder: "" },
                      ]);
                    }}
                  >
                    Add Field
                  </Button>
                </Box>

                {/* Template Fields List */}
                {currentTemplateFields.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography>No fields added to template</Typography>
                  </Box>
                ) : (
                  currentTemplateFields.map((field, index) => (
                    <Paper
                      key={field.id}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        backgroundColor: '#f8fafc'
                      }}
                    >
                      <TextField
                        label="Label"
                        value={field.label}
                        onChange={(e) => updateTemplateField(index, "label", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      
                      <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={field.type}
                          onChange={(e) => updateTemplateField(index, "type", e.target.value)}
                          label="Type"
                        >
                          {fieldTypes.map((f) => (
                            <MenuItem key={f.type} value={f.type}>
                              {f.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      <Box>
                        <Tooltip title="Move up">
                          <span>
                            <IconButton 
                              size="small" 
                              disabled={index === 0}
                              onClick={() => moveTemplateField(index, "up")}
                            >
                              <ArrowUpward fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Move down">
                          <span>
                            <IconButton 
                              size="small" 
                              disabled={index === currentTemplateFields.length - 1}
                              onClick={() => moveTemplateField(index, "down")}
                            >
                              <ArrowDownward fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => removeTemplateField(index)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Paper>
                  ))
                )}

                {/* Preview */}
                {currentTemplateFields.length > 0 && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" mb={2}>
                      Preview
                    </Typography>
                    
                    <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      {currentTemplateFields.map((field) => (
                        <Box key={field.id} sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight="500" gutterBottom>
                            {field.label || "Label"} {field.required && "*"}
                          </Typography>
                          {renderFieldInput(field)}
                        </Box>
                      ))}
                    </Paper>
                  </>
                )}

                {/* Save Template */}
                <Box mt={3}>
                  <TextField
                    fullWidth
                    label="Template Name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    size="small"
                  />
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={saveTemplate}
                    disabled={!templateName.trim() || currentTemplateFields.length === 0}
                  >
                    Save Template
                  </Button>
                </Box>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setTemplateModalOpen(false)}
              variant="outlined"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}