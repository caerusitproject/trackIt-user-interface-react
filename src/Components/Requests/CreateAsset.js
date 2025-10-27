import { useState } from "react";
import {Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Button } from "@mui/material";

export default function AddAssetDialog({open, onClose, initialData}){
    const isEdit = Boolean(initialData && initialData.id);

    const [form, setForm] = useState(initialData || {
      id: "",
      assetTag: "",
      assetName: "",
      description: "",
      purchaseDate: "",
      warrantyExpireDate: "",
      location: "",
      status: "",
      cost: "",
      vendorName: "",
      serialNumber: "",
      subcategoryId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   console.log("Submitting: ", form)
   onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit Asset": "Add Asset"}</DialogTitle>
      <DialogContent sx={{ width: 450, pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      
      {isEdit && (
        <TextField
          label="Asset ID"
          name="id"
          value={form.id}
          fullWidth
          slotProps={{
          input: {
            readOnly: true,
            },
          }}
        />
      )}

      <TextField
          label="Asset Name"
          name="assetName"
          value={form.assetName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Serial Number"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          select
          label="Subcategory"
          name="subcategoryId"
          value={form.subcategoryId}
          onChange={handleChange}
          required
          fullWidth
        > <MenuItem value="1">Laptop</MenuItem>
          <MenuItem value="2">Monitor</MenuItem>
          <MenuItem value="3">Printer</MenuItem></TextField>
        
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          minRows={2}
          fullWidth
        />

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}