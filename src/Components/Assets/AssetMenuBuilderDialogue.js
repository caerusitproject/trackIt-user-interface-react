import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import * as actions from '../../stores/actions'
import { useDispatch } from 'react-redux';

export default function AssetMenuBuilderDialogue({
  open,
  onClose,
  additionType,
  modalData,
  setModalData,
  sendDatatoParent,
  editItem,
  categoryId,
  typeholder
}) {
  console.log('edited item____',editItem)
  const dispatch = useDispatch();

 React.useEffect(() => {
    if(editItem){
      console.log('editItem filter',editItem,typeholder)
      if(typeholder === 'subcategory'){
        setModalData({
          title: editItem.name,
          code: editItem.code,
          description: editItem.description
        });
      }else{
        setModalData({
          title: editItem.categoryName,
          code: editItem.categoryCode,
          description: editItem.description
        });
    }
  }else{
    return
  }
  }, [editItem])
  

    const handleCreateCategoryOrSubcategory = () => {
      if(additionType === "category-item"){
        console.log('Creating or Editing Category Item')
        const data ={
          "categoryCode": modalData.code,
          "categoryName": modalData.title,
          "description": modalData.description
        }
        console.log('category data___', data)
        dispatch(actions.createOrEditCategoryItem(data))
      }
      else if(additionType === "subcategory-item"){
        console.log('Creating or Editing Subcategory Item',modalData);
        const dataSubCategory ={
          "categoryId": categoryId,
          "code": modalData.code,
          "name": modalData.title,  
          "description": modalData.description
        }
        console.log('subcategory data___', dataSubCategory)
        dispatch(actions.createOrEditSubcategoryItem(dataSubCategory))
      }else if(additionType === "edit-category-item"){
        const editedData ={
          "id": editItem.id,
          "categoryCode": modalData.code,
          "categoryName": modalData.title,
          "description": modalData.description
        }
        console.log('Editing Category Item', editedData)
         dispatch(actions.createOrEditCategoryItem(editedData))
      }else if(additionType === "edit-subcategory-item"){
        const editedSubcategoryData ={
          "categoryId": categoryId,
          "subcategoryId": editItem.id,
          "code": modalData.code,
          "name": modalData.title,  
          "description": modalData.description
        }
        console.log('Editing Subcategory Item', editedSubcategoryData)
         dispatch(actions.createOrEditSubcategoryItem(editedSubcategoryData))
      }
    };

    const categoryorSubcategoryFinder = (type)=>{
        if(type === "category-item" || type === "edit-category-item"){
            return modalData.id ? "Edit Category Item" : "Add Category Item"
        }else{
            return modalData.id ? "Edit Subcategory Item" : "Add Subcategory Item"
        }
    }

  return (
     <Dialog open={open} onClose={()=>onClose()} maxWidth="sm" fullWidth>
        <DialogTitle>
          {categoryorSubcategoryFinder(additionType)}
          {/* {additionType === "category-item" 
            ? modalData.id
              ? "Edit Category Item"
              : "Add Category Item"
            : modalData.id
            ? "Edit Subcategory Item"
            : "Add Subcategory Item"} */}
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
            label="Code"
            fullWidth
            value={modalData.code || ""}
            onChange={(e) =>
              setModalData({ ...modalData, code: e.target.value })
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
              handleCreateCategoryOrSubcategory()
              onClose()
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
