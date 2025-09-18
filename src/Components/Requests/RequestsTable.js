import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {MaterialReactTable} from "material-react-table";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Select,
  TablePagination ,
  Pagination,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FolderIcon from "@mui/icons-material/Folder";
import FilterDialogue from "./FilterDialogue";
import { HeaderBar, Toolbar, YellowDot } from "../../styled_components/requesttable.styled";


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirst = (e) => onPageChange(e, 0);
  const handleBack = (e) => onPageChange(e, page - 1);
  const handleNext = (e) => onPageChange(e, page + 1);
  const handleLast = (e) => {
    const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    onPageChange(e, lastPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirst} disabled={page === 0}>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBack} disabled={page === 0}>
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLast}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default function RequestsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Fetch data with pagination
  const fetchPage = async (page, pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const offset = page * pageSize;
      const resp = await fetch(
        `http://localhost:3000/posts?_start=${offset}&_limit=${pageSize}`
      );
      if (!resp.ok) throw new Error("Failed to fetch data");

      const json = await resp.json();
      setRows(json);

      const total = resp.headers.get("X-Total-Count") || json.total || 15;
      setTotalCount(Number(total));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // MRT handles pagination, so listen to page changes
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    fetchPage(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  // ✅ Define columns
  const columns = useMemo(
    () => [
      {
        id: "select", // for checkbox selection
        header: "",
        enableColumnActions: false,
        enableSorting: false,
        size: 50,
      },
      {
        accessorKey: "mailIcon",
        header: "",
        Cell: () => (
          <IconButton size="small">
            <MailIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        accessorKey: "editIcon",
        header: "",
        Cell: () => (
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        accessorKey: "noteIcon",
        header: "",
        Cell: () => (
          <IconButton size="small">
            <SummarizeIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        accessorKey: "id",
        header: "Id",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <YellowDot />
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
    ],
    []
  );

 const handleChangePage = (_, newPage) => {
  setPagination((prev) => ({ ...prev, pageIndex: newPage }));
};

const handleChangeRowsPerPage = (e) => {
  const newSize = parseInt(e.target.value, 10);
  setPagination({ pageIndex: 0, pageSize: newSize });
};
const totalPages = Math.ceil(totalCount / pagination.pageSize);
  return (
    <Box>
      {/* ✅ Custom Header */}
     <HeaderBar>
        <FolderIcon />
        My Completed Requests
         <span style={{ flex: 1 }} />
              <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={totalCount}
                rowsPerPage={pagination.pageSize}
                page={pagination.pageIndex}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />

             <IconButton
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "8px",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={() => window.open("https://github.com", "_blank")}
              >
                <RefreshIcon sx={{ color: "#000000" }} />
              </IconButton>

              <IconButton
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => window.open("https://github.com", "_blank")}
                >
                  <SettingsIcon sx={{ color: "#000000" }} />
                </IconButton>

                 <IconButton
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={()=>{setOpen(true)// setChecked(true)
                    }}
                >
                  <FilterAltIcon sx={{ color: "#000000" }} />
                </IconButton>
          
      </HeaderBar>

      <Toolbar>
        <input type="text" placeholder="Search..." style={{ width: 170 }} />
        <select style={{ width: 95 }}>
          <option>All</option>
          <option>Open</option>
          <option>Closed</option>
        </select>
        <span style={{ flex: 1 }} />
      </Toolbar>

      {/* ✅ Material React Table */}
      <MaterialReactTable
        columns={columns}
        data={rows}
        state={{
          isLoading: loading,
          pagination,
          showAlertBanner: !!error,
          showProgressBars: loading,
        }}
        enableRowSelection
        enablePagination={false}
        manualPagination
        rowCount={totalCount}
        // onPaginationChange={setPagination}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/request/ticket/${row.original.id}`),
          sx: { cursor: "pointer" },
        })}
        muiToolbarAlertBannerProps={
          error ? { color: "error", children: error } : undefined
        }
      />

      <FilterDialogue
        open={open}
        setOpen={setOpen}
        checked={checked}
        setChecked={setChecked}
      />
    </Box>
  );
}

