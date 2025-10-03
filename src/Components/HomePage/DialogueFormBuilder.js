import React from 'react';
import {
  Box,
  Typography,
  TextField,
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
  Grid,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Delete,
  ArrowUpward,
  ArrowDownward,
  Add,
  ContentCopy,
} from "@mui/icons-material";

export default function DialogueFormBuilder({
    fieldTypes,
    open,
    fields,
    setFields,
    currentTemplateFields,  
    setCurrentTemplateFields,
    templates,
    setTemplates,
    templateName,
    setTemplateName,
    setTemplateModalOpen,
    renderFieldInput
}) {
    const [activeTemplateTab, setActiveTemplateTab] = React.useState(0);

        const addTemplateToForm = (template) => {
            const fieldsWithNewIds = template.fields.map(field => ({
            ...field,
            id: Date.now() + Math.random()
            }));
            setFields([...fields, ...fieldsWithNewIds]);
            setTemplateModalOpen(false);
        };
// Remove template field
         const removeTemplateField = (index) => {
            const updated = [...currentTemplateFields];
            updated.splice(index, 1);
            setCurrentTemplateFields(updated);
        };
// Update template field
    const updateTemplateField = (index, key, value) => {
        const updated = [...currentTemplateFields];
        updated[index] = { ...updated[index], [key]: value };
        setCurrentTemplateFields(updated);
    };

  // Update template field layout
        const updateTemplateFieldLayout = (index, key, value) => {
            const updated = [...currentTemplateFields];
            updated[index] = { 
            ...updated[index], 
            layout: { ...updated[index].layout, [key]: value } 
            };
            setCurrentTemplateFields(updated);
        };

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


  return (
      <Dialog
          open={open}
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
                        { 
                          id: Date.now(), 
                          label: "", 
                          type: "Text", 
                          required: false, 
                          placeholder: "",
                          layout: {
                            width: "100%",
                            flex: 1,
                            direction: "vertical"
                          }
                        },
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
                        alignItems: 'flex-start',
                        backgroundColor: '#f8fafc',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'flex-start' }}>
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
                      </Box>

                      {/* Template Field Layout Configuration */}
                      <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <InputLabel>Direction</InputLabel>
                          <Select
                            value={field.layout?.direction || "vertical"}
                            onChange={(e) => updateTemplateFieldLayout(index, "direction", e.target.value)}
                            label="Direction"
                          >
                            <MenuItem value="vertical">Vertical</MenuItem>
                            <MenuItem value="horizontal">Horizontal</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 100 }}>
                          <InputLabel>Width</InputLabel>
                          <Select
                            value={field.layout?.width || "100%"}
                            onChange={(e) => updateTemplateFieldLayout(index, "width", e.target.value)}
                            label="Width"
                          >
                            <MenuItem value="100%">Full</MenuItem>
                            <MenuItem value="50%">Half</MenuItem>
                            <MenuItem value="33%">Third</MenuItem>
                            <MenuItem value="25%">Quarter</MenuItem>
                          </Select>
                        </FormControl>
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
                    
                    <Paper sx={{ p: 2, backgroundColor: '#f8fafc', overflow: 'visible' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 'max-content' }}>
                        {currentTemplateFields.map((field) => (
                          <Box 
                            key={field.id} 
                            sx={{ 
                              width: field.layout?.width || '100%',
                              flex: '0 0 auto'
                            }}
                          >
                            <Typography variant="body2" fontWeight="500" gutterBottom>
                              {field.label || "Label"} {field.required && "*"}
                            </Typography>
                            {renderFieldInput(field)}
                          </Box>
                        ))}
                      </Box>
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
  )
}
