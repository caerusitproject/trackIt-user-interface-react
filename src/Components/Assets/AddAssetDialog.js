import React from "react";
import { useState } from "react";
import {Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import * as actions from "../../stores/actions";
import { useDispatch ,useSelector} from "react-redux";

export default function AddAssetDialog({open, onClose, initialData , categories}){
    const dispatch = useDispatch();
    
    const isEdit = Boolean(initialData && initialData.id);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
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
      categoryId: "",
      subcategoryId: "",
      location: "",
      cost:"",
      status:""
      
  });

  // React.useEffect(() => {
  //   dispatch(actions.viewCategories());
  // }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Update existing asset
      console.log("Updating: ", form);
    } else {
      // Create new asset
      let obj={...form,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        warrantyExpireDate: expiryDate ? new Date(expiryDate) : null,
      }
      dispatch(actions.createOrAssetsItem(obj));
      console.log("Creating: ", obj);
    }
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

        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Purchase Date"
            value={purchaseDate}
            format="DD-MM-YYYY"
            onChange={(newValue)=>{
              setPurchaseDate(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    height: "56px",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiry Date"
            value={expiryDate}
            format="DD-MM-YYYY"
            onChange={(newValue)=>{
              setExpiryDate(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    height: "56px",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        </div>

         <TextField
          label="Cost"
          name="cost"
          value={form.cost}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            },
          }}
          onChange={handleChange}
          multiline
          fullWidth
        />

        <TextField
          select
          label="Category"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          fullWidth
        >
          {categories && categories.length > 0  && categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>

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
          <MenuItem value="3">Printer</MenuItem>
        </TextField>

          <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          fullWidth
        > <MenuItem value="1">Laptop</MenuItem>
          <MenuItem value="2">Monitor</MenuItem>
          <MenuItem value="3">Printer</MenuItem>
        </TextField>
        
         <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          multiline
          fullWidth
        />

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