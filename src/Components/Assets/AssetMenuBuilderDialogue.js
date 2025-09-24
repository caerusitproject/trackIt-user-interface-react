import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

export default function AssetMenuBuilderDialogue({
  open,
  onClose,
  additionType,
  modalData,
  setModalData,
  sendDatatoParent
}) {

    const handleChildData = (type) => {
        sendDatatoParent(type)
     }
  return (
     <Dialog open={open} onClose={()=>onClose()} maxWidth="sm" fullWidth>
        <DialogTitle>
          {additionType === "main-menu"
            ? modalData.id
              ? "Edit Menu Item"
              : "Add Menu Item"
            : modalData.id
            ? "Edit Submenu Item"
            : "Add Submenu Item"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={modalData.title || ""}
            onChange={(e) =>
              setModalData({ ...modalData, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            value={modalData.description || ""}
            onChange={(e) =>
              setModalData({ ...modalData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={()=>{
                if(additionType && additionType == "main-menu"){
                    handleChildData("main-menu")
                }else{
                    handleChildData("sub-menu")
                }
            }}
            variant="contained"
            sx={{ bgcolor: "#f46b45", "&:hover": { bgcolor: "#d93d04" } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
  )
}
