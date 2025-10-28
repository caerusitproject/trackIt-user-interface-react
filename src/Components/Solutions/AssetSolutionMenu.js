import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useSelector } from "react-redux";
import SolutionTable from "./SolutionTable";

const AssetsSolutionNavigation = () => {
  const menuBuildersOptions = useSelector(
    (state) => state.menubuilder.menusSubmenus
  );

  const [selectedSubmenu, setSelectedSubmenu] = useState("");

  const handleSelect = (event, itemId) => {
    setSelectedSubmenu(itemId);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left TreeView Sidebar */}
      <Box
        sx={{
          minWidth: 235,
          borderRight: "1px solid #ddd",
          p: 2,
          bgcolor: "#fafafa",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          Topics
        </Typography>

        <SimpleTreeView
          multiSelect={false}
          onSelectedItemsChange={handleSelect}
          sx={{ minHeight: 400 }}
        >
          {menuBuildersOptions &&
            Array.isArray(menuBuildersOptions) &&
            menuBuildersOptions.map((menu, index) => (
              <TreeItem
                key={index}
                itemId={menu.title}
                label={menu.title}
              >
                {menu.submenus.map((submenu, idx) => (
                  <TreeItem
                    key={idx}
                    itemId={submenu?.id}
                    label={submenu?.title}
                  />
                ))}
              </TreeItem>
            ))}
        </SimpleTreeView>
      </Box>

      {/* Right Content Panel */}
      <Box sx={{ flex: 1, p: 3 }}>
         <SolutionTable />
      </Box>
    </Box>
  );
};

export default AssetsSolutionNavigation;
