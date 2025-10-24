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
import jsonData from "../../db.json"
import DeleteIcon from '@mui/icons-material/Delete';
import { HeaderBar, Toolbar, YellowDot,ResponsiveTableWrapper,GreenDot,RedDot } from "../../styled_components/requesttable.styled";
import { useSelector,useDispatch } from "react-redux";
import * as actions from "../../stores/actions";
import dayjs from "dayjs";
import GlobalLoader from "../../Config/GlobalLoader";
import {deleteTicketService} from "../../services/tickets.services"
import ConfirmationDialog from "../../Config/ConfirmationDialogue"


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
  const allTickets=useSelector((state)=>state.ticket.viewallTickets)
  const actionStatus =useSelector((state)=>state.ticket.actionStatus)
  
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {ticketObj} = useSelector((state)=> state.ticket)
  const [ticketId, setTicketId] = useState(null)
  const [rows, setRows] = useState([]);
  const [ticketsAll, setTicketsAll] = useState(null)
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cachedTickets, setCachedTickets] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

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
      // setRows(json);
      setRows(jsonData.posts);

      const total = resp.headers.get("X-Total-Count") || json.total || 15;
      setTotalCount(Number(total));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


// MRT handles pagination, so listen to page changes

// useEffect(() => {
  //   dispatch(actions.viewAllTicket(pagination.pageIndex, pagination.pageSize))
  //    setTotalCount(allTickets?.totalElements);
  //   // fetchPage(pagination.pageIndex, pagination.pageSize);
  //    setRows(jsonData.posts);
  // }, [pagination,allTickets]);
  
  useEffect(() => {
    dispatch(actions.viewAllTicket(pagination.pageIndex, pagination.pageSize));
    dispatch(actions.storePagination(pagination.pageIndex, pagination.pageSize));
  }, [dispatch,pagination.pageIndex, pagination.pageSize]);
  
  useEffect(() => {
  let ignore = false;

  const fetchData = async () => {
    if (ignore) return;
    await dispatch(actions.viewAllTicket(pagination.pageIndex, pagination.pageSize));
    await dispatch(actions.storePagination(pagination.pageIndex, pagination.pageSize));
  };

  fetchData();

  return () => { ignore = true; };
}, [pagination]);

useEffect(() => {
  if (!allTickets || allTickets.length === 0) {
    dispatch(actions.viewAllTicket(pagination.pageIndex, pagination.pageSize))
    dispatch(actions.storePagination(pagination.pageIndex, pagination.pageSize));
  }
}, [dispatch]);

console.log('show all tickets__',allTickets)
  // useEffect(() => {
  //   // fetchPage(pagination.pageIndex, pagination.pageSize);
  //    setRows(jsonData.posts);
  //    console.log('json data____',jsonData.posts)
  // }, [jsonData]);

  // ✅ Define columns
const columns = useMemo(
    () => [
      {
        id: "select",
        header: "",
        enableColumnActions: false,
        enableSorting: false,
        size: 50,
      },
      {
        accessorKey: "mailIcon",
        header: "",
        enableColumnActions: false,
        enableSorting: false,
        size: 50, // Force min sizes to expand table
        Cell: () => (
          <IconButton size="small">
            <MailIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        accessorKey: "noteIcon",
        header: "",
        enableColumnActions: false,
        enableSorting: false,
        size: 50,
        Cell: () => (
          <IconButton size="small">
            <SummarizeIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        accessorKey: "id",
        header: "Id",
        size: 100,
        Cell: ({ cell }) => {
          let priority=cell.row.original.priority.toLowerCase();
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {priority === 'high' && <RedDot />}
              {priority === 'medium' && <YellowDot />}
              {priority === 'low' && <GreenDot />}
              {cell.getValue()}
            </Box>
          );
      },
      },
       {
        accessorKey: "status",
        header: "Status",
        size: 200, // Wider for potential long text
        muiTableBodyCellProps: { sx: { whiteSpace: 'nowrap' } }, // Prevent wrapping to force width
      },
      {
        accessorKey: "priority",
        header: "Priority",
        size: 200, // Wider for potential long text
        muiTableBodyCellProps: { sx: { whiteSpace: 'nowrap' } }, // Prevent wrapping to force width
      },
      {
        accessorKey: "subject",
        header: "Subject",
        size: 200, // Wider for potential long text
        muiTableBodyCellProps: { sx: { whiteSpace: 'nowrap' } }, // Prevent wrapping to force width
      },
      {
        accessorKey: "requester",
        header: "Requestor",
        size: 150,
      },
      {
        accessorKey: "assigneeUserId",
        header: "Assigned To",
        size: 150,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? dayjs(value).format('YYYY-MM-DD') : "—";
        },
        size: 120,
      },
      { accessorKey: "dueDate",
        header: "End Date",
        size: 120, 
         Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? dayjs(value).format('YYYY-MM-DD') : "—";
        },
      },
       {
        accessorKey: "editIcon",
        header: "Actions",
        enableColumnActions: false,
        enableSorting: false,
        size: 50,
        Cell: ({cell}) => {
          let ticketId=cell.row.original.id
          return(
            <div style={{display:"flex",justifyContent:"center"}}>
          <IconButton
            onClick={(e)=>{
                e.stopPropagation()
                if (allTickets && allTickets == null && allTickets?.content.length == 0) return;
                dispatch(actions.openFulldialogue())
                dispatch(actions.selectTicketForEdit(ticketId));
                dispatch(actions.editStatusChecker('EDIT'));
             }}
              size="small">
            <EditIcon 
            fontSize="small" />
          </IconButton>
          <IconButton 
             onClick={(e)=>{
                e.stopPropagation()
                setTicketId(ticketId)
                dispatch(actions.openSideDrawer(`You are about to delete this ticket id ${ticketId}`, true));
                //  alert('now this ticket id will be deleted !')
             }}
          >
             <DeleteIcon
              fontSize="small"
             />
          </IconButton>
          </div>
          )
        },
      },
    ],
    []
  );

  console.log('table creation__',allTickets,actionStatus)

 const handleChangePage = (_, newPage) => {
  setPagination((prev) => ({ ...prev, pageIndex: newPage }));
};

const handleChangeRowsPerPage = (e) => {
  const newSize = parseInt(e.target.value, 10);
  setPagination({ pageIndex: 0, pageSize: newSize });
};

const handleAgreedAction = async()=>{
  try{
    deleteTicketService(ticketId).then((res)=>{
      if(res && res?.status){
        dispatch(actions.openSideDrawer(``, false));
        dispatch(actions.viewAllTicket(pagination.pageIndex, pagination.pageSize));
        dispatch(actions.openSnackbar({message:'Deleted Successfully',status:"success"}))
      }
    }).catch((err)=>{
       dispatch(actions.openSnackbar({message:err.message,status:"error"}))
    })
  }catch(err){
     dispatch(actions.openSnackbar({message:err.message,status:"error"}))
     
  }
}
// const totalPages = Math.ceil(totalCount / pagination.pageSize);
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
                count={totalCount || allTickets?.totalElements}
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
              onClick={() => window.location.reload()}
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

<Box sx={{ overflowX: 'auto', maxWidth: '70vw', display: 'block' }}> 
  {!allTickets ? (
  <GlobalLoader/>
    ) : ( 
      <MaterialReactTable
        columns={columns}
        data={allTickets?.content ?? []}
        state={{
          isLoading: loading,
          pagination,
          showAlertBanner: !!error,
          showProgressBars: loading,
        }}
        enableRowSelection
        enablePagination={false}
        manualPagination
        rowCount={totalCount || allTickets?.totalElements} 
        muiTableContainerProps={{
          sx: {
            minWidth: '700px',  // Adjust this based on your columns (e.g., 'max-content' to auto-fit widest content)
            maxWidth: '70vw',   // Prevent capping
            // overflowX: 'none',  // Ensure inner content can overflow
          },
        }}
        muiTablePaperProps={{
          sx: {
            boxShadow: 'none',  // Removes elevation that might clip
            overflow: 'visible',  // Allows overflow to bubble up
            width: '100%',      // Fits parent but allows child overflow
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/request/ticket/${row.original.id}`),
          sx: { cursor: 'pointer' },
        })}
        muiToolbarAlertBannerProps={
          error ? { color: 'error', children: error } : undefined
        }
      />
    )
    }
</Box>

    <ConfirmationDialog agreedAction={handleAgreedAction} />
      <FilterDialogue
        open={open}
        setOpen={setOpen}
        checked={checked}
        setChecked={setChecked}
      />
    </Box>
  );
}

