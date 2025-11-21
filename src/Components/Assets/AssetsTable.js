import React, { use, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper
} from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import AddAssetDialog from "./AddAssetDialog";
import dayjs from "dayjs";
import * as actions from "../../stores/actions";

const AssetsNavigation = () => {
  const dispatch = useDispatch();
  // const assets = useSelector((state) => state.assets.assetsTable);
  const categories = useSelector((state) => state.CategorySubcategory.categories);
  const menuBuildersOptions = useSelector(
    (state) => state.menubuilder.menusSubmenus
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch assets data or perform any necessary side effects
    dispatch(actions.viewAssets());
    dispatch(actions.viewCategories())
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Id", size: 80 },
      { accessorKey: "status", header: "Status", size: 120 },
      { accessorKey: "assetName", header: "Asset Name", size: 200 },
      { accessorKey: "assetTag", header: "Asset Tag", size: 150 },
      { accessorKey: "description", header: "Description", size: 200 },
      { accessorKey: "purchaseDate", header: "Purchase Date", size: 150 },
      {
        accessorKey: "warrantyExpireDate",
        header: "Warranty Expiry Date",
        Cell: ({ cell }) =>
          cell.getValue() ? dayjs(cell.getValue()).format("YYYY-MM-DD") : "—",
        size: 150,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 120,
      },
      { accessorKey: "cost", header: "Cost", size: 100 },
    ],
    []
  );

  const handleSelect = (event, itemId) => {
    console.log("Selected Submenu:", itemId);
  };

  const Sidebar = (
    <Box
      sx={{
        width: isMobile ? 250 : 280,
        p: 2,
        borderRight: isMobile ? "none" : "1px solid #ddd",
        bgcolor: "#fafafa",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: "1.1rem",
          textAlign: "center",
        }}
      >
        Assets
      </Typography>

      <SimpleTreeView
        multiSelect={false}
        onSelectedItemsChange={handleSelect}
        sx={{ minHeight: 400 }}
      >
        {categories?.map((menu, index) => (
          <TreeItem key={index} itemId={menu.id} label={menu.categoryName}>
            {/* {menu.submenus?.map((submenu, idx) => (
              <TreeItem key={idx} itemId={submenu.id} label={submenu.title} />
            ))} */}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  );
  console.log('assets table________', categories);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Sidebar */}
      {isMobile ? (
        <>
          <IconButton
            color="primary"
            onClick={() => setDrawerOpen(true)}
            sx={{ alignSelf: "flex-start", m: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {Sidebar}
          </Drawer>
        </>
      ) : (
        Sidebar
      )}

      {/* Right Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3 },
          overflowX: "auto", // ensures horizontal scroll if needed
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Asset
          </Button>
        </Box>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              m: 1,
              borderRadius: 3,
              
            }}
          >
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            "& .MuiTableContainer-root": {
              minWidth: 700,
            },
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={[]}
            enablePagination={false}
            enableRowSelection
            manualPagination
            rowCount={0}
           muiTableContainerProps={{
              sx: {
                minWidth: '700px',  // Adjust this based on your columns (e.g., 'max-content' to auto-fit widest content)
                maxWidth: '70vw',   // Prevent capping
                // overflowX: 'none',  // Ensure inner content can overflow
              },
          }}
            muiTablePaperProps={{
              sx: {
                boxShadow: "none",
                width: "100%",
              },
            }}
          />
        </Box>
        </Paper>
      </Box>

      <AddAssetDialog open={open} 
      onClose={() => setOpen(false)} 
      categories={categories && categories.length > 0 ? categories : []}
      />
    </Box>
  );
};

export default AssetsNavigation;
