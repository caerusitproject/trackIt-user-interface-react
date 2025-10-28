import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grow from '@mui/material/Grow';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {DialogueTheme,ColorButton,ColorButtonCancel} from "../../styled_components/resuablecontainer.styled"
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../stores/actions/ticket.action';
import moment from 'moment';
import dayjs from "dayjs";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterDialogue({open,setOpen,checked,setChecked}) {
  const {page,pageSize} =useSelector((state)=>state.ticket)
  const dispatch = useDispatch();
  const [applyFilter, setApplyFilter] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const [dropDate, setDropDate] = React.useState({
    status:'',
    priority:'',
    category:'',
    subCategory:'',
  })
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const statusOptions = [
    { value: 'CREATED', label: 'Created' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESPONDED', label: 'Responded' },
    { value: 'RESOLVED', label: 'Resolved' },
    { value: 'CLOSED', label: 'Closed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

   const priorityOptions = [
     { value: 'HIGH', label: 'High' },
     { value: 'MEDIUM', label: 'Medium' },
     { value: 'LOW', label: 'Low' },
   ];
  const categoryOptions = [
    { value: 'software', label: 'SOFTWARE' },
    { value: 'hardware', label: 'HARDWARE' },
    { value: 'network', label: 'NETWORK' },
  ];
  const subCategoryOptions = [
    { value: 'oracle', label: 'ORACLE' },
    { value: 'meta', label: 'META' },
    { value: 'google', label: 'GOOGLE' },
  ];

  const handleClose = () => {
    setDropDate({
       status:'',
      priority:'',
      category:'',
      subCategory:'',
      
    })
    //  setStartDate(null)
    //  setEndDate(null)
    dispatch(actions.filterTickets('', '', '', '', page, pageSize));
    setOpen(false);
  };

  const handleApply = ()=>{
    // alert('Filter Applied')
    setApplyFilter(true)
    dispatch(actions.filterTickets(
      dropDate.status,
      dropDate.priority,
      dropDate.category,
      dropDate.subCategory,
      page,pageSize
      // startDate ? dayjs(startDate).format("YYYY-MM-DD") : '',
      // endDate ? dayjs(endDate).format("YYYY-MM-DD") : ''
    ))
    // handleClose()
    // setStartDate(null)
    // setEndDate(null)
    // setLoading(true);
    setOpen(false);
  }
  console.log('dates and attributes__',dropDate,dropDate.attributes,dropDate.subAttributes,page,pageSize,
// startDate ? dayjs(startDate).format("YYYY-MM-DD"):'',
// endDate ? dayjs(endDate).format("YYYY-MM-DD"):''
)

// const InputLabelProps = () => {
//   if(dropDate && dropDate.attributes == 10){
//     return "Select Status"
//   }else if(dropDate && dropDate.attributes == 20){
//     return "Select Priority"
//   }else if(dropDate && dropDate.attributes == 30){
//     return "Select Category"
//   }
//   else if(dropDate && dropDate.attributes == 40){
//     return "Select Sub Category"
//   }
// }

  return (
      <DialogueTheme
        open={open}
        slots={{
          transition: Transition,
        }}
        fullWidth
        keepMounted
        onClose={()=>{
          if(applyFilter == false){
            setDropDate({
              status:'',
              priority:'',  
              category:'',
              subCategory:'',
            })
          }
          setOpen(false)
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"7px"}}>
            {"Custom Filter"}<ManageSearchIcon/>
            </div>
        <div><IconButton onClick={()=>{
               if(applyFilter == false){
            setDropDate({
              status:'',
              priority:'',  
              category:'',
              subCategory:'',
            })
          }
          setOpen(false)}
          }><CancelIcon/></IconButton></div>
        </DialogTitle>
        <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // stack rows
            gap: "20px",
            margin: "20px auto",
            width: "95%",
          }}
        >
        {/* Row 1: Select Field */}
        {/* Status and Priority */}
              <Grow in={open} timeout={650}>
                <Box sx={{ display: "flex", gap: "20px",justifyContent:"space-between" }}>
                  <FormControl sx={{width:"48%"}}>
                    <InputLabel id="age-label">Status</InputLabel>
                    <Select
                      labelId="age-label"
                      id="age-select"
                      label="Status"
                      value={dropDate.status}
                      onChange={(e)=>{
                        setDropDate({...dropDate,status:e.target.value})
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "56px", // standard height
                        },
                      }}
                    >
                       <MenuItem value={''}>{'None'}</MenuItem>
                      { statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                  <FormControl sx={{width:"48%"}}>
                    <InputLabel id="age-label">Priority</InputLabel>
                    <Select
                      labelId="age-label"
                      id="age-select"
                      label="Priority"
                      value={dropDate.priority}
                      onChange={(e)=>{
                        setDropDate({...dropDate,priority:e.target.value})
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "56px", // standard height
                        },
                      }}
                    >
                      <MenuItem value={''}>{'None'}</MenuItem>
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grow>
               <Grow in={open} timeout={650}>
                <Box sx={{ display: "flex", gap: "20px",justifyContent:"space-between" }}>
                  <FormControl sx={{width:"48%"}}>
                    <InputLabel id="age-label">Category</InputLabel>
                    <Select
                      labelId="age-label"
                      id="age-select"
                      label="Category"
                      value={dropDate.category}
                      onChange={(e)=>{
                        setDropDate({...dropDate,category:e.target.value})
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "56px", // standard height
                        },
                      }}
                    >
                      <MenuItem value={''}>{'None'}</MenuItem>
                      {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                  <FormControl sx={{width:"48%"}}>
                    <InputLabel id="age-label">Sub Category</InputLabel>
                    <Select
                      labelId="age-label"
                      id="age-select"
                      label="Sub Category"
                      value={dropDate.subCategory}
                      onChange={(e)=>{
                        setDropDate({...dropDate,subCategory:e.target.value})
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "56px", // standard height
                        },
                      }}
                    >
                      <MenuItem value={''}>{'None'}</MenuItem>
                      {subCategoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grow>

              {/* Row 2: Two DatePickers side by side */}
              <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
              >
              <Grow in={open} timeout={800}>
                <Box sx={{ flex: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue)=>{
                        setStartDate(newValue)
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
                </Box>
              </Grow>

              <Grow in={open} timeout={950}>
                <Box sx={{ flex: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue)=>{
                        setEndDate(newValue)
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
                </Box>
              </Grow>
            </Box>
          </Box>
          
          </DialogContent>
        <DialogActions>
          <ColorButtonCancel
           disabled={dropDate.status == '' && dropDate.priority == '' && dropDate.category == '' && dropDate.subCategory == '' ? true : false}
          onClick={handleClose}>Cancel</ColorButtonCancel>
          <ColorButton 
          // style={{cursor: diabled == true ? "not-allowed":''}}
          loading={loading}
          loadingPosition="start" 
          disabled={dropDate.status == '' && dropDate.priority == '' && dropDate.category == '' && dropDate.subCategory == '' ? true : false}
          onClick={handleApply}>Apply Filter</ColorButton>
        </DialogActions>
    
      </DialogueTheme>
  )
}
