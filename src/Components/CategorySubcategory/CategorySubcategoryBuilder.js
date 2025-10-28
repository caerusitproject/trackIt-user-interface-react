import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssetMenuBuilderDialogue from "./AssetMenuBuilderDialogue";
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../../stores/actions'
import ConfirmationDialog from "../../Config/ConfirmationDialogue";

const CategorySubcategoryBuilder = () => {
  const categories = useSelector((state) => state.CategorySubcategory.categories);
  const subcategories = useSelector((state) => state.CategorySubcategory.subcategories);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [subMenuId, setSubMenuId] = useState(null)
  const [additionType, setAdditionType] = useState(""); 
  const [currentParentId, setCurrentParentId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [typeholder, setTypeholder] = useState(null)
    

  useEffect(() => { 
    dispatch(actions.viewCategories())
  }, []);
  // Example Data
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      title: "Workstation",
      menutype:"main-menu",
      description: "Computing devices for work",
      submenus: [
        {
          id: 101,
          title: "Laptops",
          menutype:"sub-menu",
          description: "Portable computers for mobile work",
        },
        {
          id: 102,
          title: "Desktops",
          menutype:"sub-menu",
          description: "Stationary computers for office use",
        },
        {
          id: 103,
          title: "Tablets",
          menutype:"sub-menu",
          description: "Touch screen devices for mobility",
        },
      ],
    },
    {
      id: 2,
      title: "Softwares",
      menutype:"main-menu",
      description: "Essential office tools and equipment",
      submenus: [
        {
          id: 201,
          title: "OS",
          menutype:"sub-menu",
          description: "Pens, papers, and other supplies",
        },
        {
          id: 202,
          title: "Building Blocks",
          menutype:"sub-menu",
          description: "Desks, chairs, and storage units",
        },
         {
          id: 203,
          title: "Utilities",
          menutype:"sub-menu",
          description: "Desks, chairs, and storage units",
        },
      ],
    },
  ]);

  React.useEffect(() => {
    if(menuData && menuData.length > 0){
      dispatch(actions.setMenuItems(menuData));
    }
  }, [menuData])
  

  const handleExpand = (panel) => (event, isExpanded) => {
    console.log('handleExpand called___',panel)
    setExpanded(isExpanded ? panel : false);
    dispatch(actions.viewSubcategories(panel));
  };

  const handleOpenModal = (type, item = null, parentId = null, menuType = null) => {
  setAdditionType(type);
  setCurrentParentId(parentId);
  setTypeholder(menuType);
  if (type === "edit-category-item") {
    let filteredCategoryItem = categories?.find(cat => cat.id === item.id);
    setEditItem(filteredCategoryItem);
    setCurrentParentId(null);
  } else if (type === "edit-subcategory-item") {
   let filteredSubCategoryItem = subcategories?.find(cat => cat.id === item.id);
    setEditItem(filteredSubCategoryItem);
    setCurrentParentId(null);
  }
  
  // else if (type === "sub-menu") { 
  //   if (parentId) {
  //     setCurrentParentId(parentId); // new submenu under a parent
  //     setEditItem(null);
  //   } else {
  //     setEditItem(item); // editing submenu
  //     setCurrentParentId(null);
  //   }
  // }

  setModalData(item || {}); // preload data for edit
  setOpenModal(true);
};

//   const handleOpenModal = (type, item) => {
//     setAdditionType(type);
//     setSubMenuId(item || null)
//     // setModalData(item || {});
//     setOpenModal(true);
//   };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData({});
  };
console.log('view only categories___',categories)
const handleSave = (menuType) => {
  if (menuType === "main-menu") {
    if (editItem) {
      // update existing
      setMenuData((prev) =>
        prev.map((menu) =>
          menu.id === editItem.id
            ? { ...menu, title: modalData.title, description: modalData.description }
            : menu
        )
      );
    } else {
      // create new
      const obj = {
        id: Date.now(),
        title: modalData.title,
        description: modalData.description,
        submenus: [],
        menutype: menuType,
      };
      setMenuData((prev) => [...prev, obj]);
    }
  } else if (menuType === "sub-menu") {
    if (editItem) {
      // update existing submenu
      setMenuData((prev) =>
        prev.map((menu) => ({
          ...menu,
          submenus: menu.submenus.map((sub) =>
            sub.id === editItem.id
              ? { ...sub, title: modalData.title, description: modalData.description }
              : sub
          ),
        }))
      );
    } else if (currentParentId) {
      // add new submenu
      const obj = {
        id: Date.now(),
        title: modalData.title,
        description: modalData.description,
        menutype: menuType,
      };
      setMenuData((prev) =>
        prev.map((menu) =>
          menu.id === currentParentId
            ? { ...menu, submenus: [...menu.submenus, obj] }
            : menu
        )
      );
    }
  }

  handleCloseModal();
};

const handledeleteCategoryAction = () => {
  console.log('delete action confirmed');
  // Add your delete logic here
};

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Category/Subcategory Item Assets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your category and subcategory items here.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#f46b45", "&:hover": { bgcolor: "#d93d04" } }}
          onClick={() => handleOpenModal("category-item")}
        >
          Add Category Item
        </Button>
      </Box>

      {/* Chips Summary */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Chip
          label={`${categories?.length} Category Items`}
          color="primary"
          variant="outlined"
        />
        {subcategories && subcategories.length > 0 && (
          <Chip
            label={`${subcategories.length} SubCategory Items`}
            color="success"
            variant="outlined"
          />
        )}
      </Box>

      {/* Accordions */}
      {categories && categories.length === 0 && (
        <Typography style={{textAlign:"center"}} variant="h6" color="text.secondary">
          No category items found. Click "Add Category Item" to create one.
        </Typography>
      )}
      {categories && categories.length > 0 && categories.map((menu) => (
        <Accordion
          key={menu.id}
          expanded={expanded === menu.id}
          onChange={handleExpand(menu.id)}
          sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{menu.categoryName}</Typography>
              <Typography variant="body2" color="text.secondary">{menu.categoryCode}</Typography>
              <Typography variant="body2" color="text.secondary">
                {menu.description}
              </Typography>
            </Box>
            {/* {subcategories && subcategories.filter((ele) => ele.id === menu.id).length > 0 && (
              <Chip
                label={`${subcategories.length} SubCategory Items`}
                size="small"
                sx={{ bgcolor: "#fff3e0", color: "#e65100", ml: 2 }}
              />
            )} */}
            <Box sx={{ ml: 2 }}>
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("subcategory-item", null, menu.id); // ✅ add sub-category
                    }}
                    >
                    <AddIcon color="warning" />
                    </IconButton>

                    <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("edit-category-item", menu,null,'category'); // ✅ edit submenu
                    }}
                    >
                    <EditIcon color="primary" />
                    </IconButton>
              <IconButton size="small" onClick={(e) => {
                e.stopPropagation();
                dispatch(actions.openSideDrawer('You are about to delete this category item. This action is irreversible. Are you sure you want to proceed?', true));
              }}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ mb: 1 }} />
            {subcategories && subcategories.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No subcategory items found. Click the "+" icon to add one.
              </Typography>
            )}
            {subcategories && subcategories.length > 0 && subcategories.map((submenu) => (
              <Box
                key={submenu.id}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{submenu.name}</Typography>
                   <Typography variant="body2" color="text.secondary">
                    {submenu.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {submenu.description}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenModal("edit-subcategory-item", submenu,null,'subcategory')} // ✅ edit submenu
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      {/* Modal */}
        <AssetMenuBuilderDialogue
          open={openModal}
          onClose={handleCloseModal}
          editItem={editItem}
          additionType={additionType}
          modalData={modalData}
          setModalData={setModalData}
          sendDatatoParent={handleSave}
          categoryId={currentParentId}
          typeholder={typeholder}
        />
     <ConfirmationDialog agreedAction={handledeleteCategoryAction} />
    </Box>
  );
};

export default CategorySubcategoryBuilder;
