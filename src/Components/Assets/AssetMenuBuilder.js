import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import * as actions from '../../stores/actions'

const MenuItemAssets = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [subMenuId, setSubMenuId] = useState(null)
  const [additionType, setAdditionType] = useState(""); 
  const [currentParentId, setCurrentParentId] = useState(null);
  const [editItem, setEditItem] = useState(null);
    

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
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenModal = (type, item = null, parentId = null) => {
  setAdditionType(type);

  if (type === "main-menu") {
    setEditItem(item); // editing a menu
    setCurrentParentId(null);
  } else if (type === "sub-menu") {
    if (parentId) {
      setCurrentParentId(parentId); // new submenu under a parent
      setEditItem(null);
    } else {
      setEditItem(item); // editing submenu
      setCurrentParentId(null);
    }
  }

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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Menu Item Assets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your menu items and their sub-categories
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#f46b45", "&:hover": { bgcolor: "#d93d04" } }}
          onClick={() => handleOpenModal("main-menu")}
        >
          Add Menu Item
        </Button>
      </Box>

      {/* Chips Summary */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Chip
          label={`${menuData.length} Menu Items`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`${menuData.reduce(
            (acc, m) => acc + m.submenus.length,
            0
          )} Sub Items`}
          color="success"
          variant="outlined"
        />
      </Box>

      {/* Accordions */}
      {menuData.map((menu) => (
        <Accordion
          key={menu.id}
          expanded={expanded === menu.id}
          onChange={handleExpand(menu.id)}
          sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{menu.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {menu.description}
              </Typography>
            </Box>
            <Chip
              label={`${menu.submenus.length} items`}
              size="small"
              sx={{ bgcolor: "#fff3e0", color: "#e65100", ml: 2 }}
            />
            <Box sx={{ ml: 2 }}>
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("sub-menu", null, menu.id); 
                    }}
                    >
                    <AddIcon color="warning" />
                    </IconButton>

                    <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("main-menu", menu); // ✅ edit submenu
                    }}
                    >
                    <EditIcon color="primary" />
                    </IconButton>
              <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ mb: 1 }} />
            {menu.submenus.map((submenu) => (
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
                  <Typography variant="subtitle1">{submenu.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {submenu.description}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenModal("sub-menu", submenu)}
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
          additionType={additionType}
          modalData={modalData}
          setModalData={setModalData}
          sendDatatoParent={handleSave}
        />
     
    </Box>
  );
};

export default MenuItemAssets;
