import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Checkbox
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import { default as Selected } from 'react-select';
import dayjs from "dayjs";
import makeAnimated from 'react-select/animated';
import Slide from '@mui/material/Slide';
import TextEditor from "./TicketDetails/Resolution/TextEditor";
import * as actions from "../../stores/actions"
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import {createTicketService,viewAllTicketService,editTicketService} from "../../services/tickets.services"
import {getChangedFields} from "../../Config/utils"
import ListItemText from '@mui/material/ListItemText';
import {formatDocuments} from "../../Config/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// Styled container
const Container = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid #e0e0e0;
  margin: 35px auto;
  width: 90%;
`;

const Header = styled.div`
  background-color: #f3f3f3;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  padding: 24px;
  margin: 30px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const FileInputLabel = styled.label`
  color: #d9534f;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  margin-bottom: 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 15px;
`;

const FileBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const FilePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileTypeLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  text-transform: uppercase;
`;

const FileOverlay = styled.div`
  position: absolute;
  top: 2;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
`;


const animatedComponents = makeAnimated();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TicketPropertiesDialog() {
  const dispatch=useDispatch()
  const userProfileData =useSelector((state)=>state.user.userProfileData)
  const openTicket =useSelector((state)=>state.ticket.openTicket)
  // const actionStatus =useSelector((state)=>state.ticket.actionStatus)
  // const allTickets=useSelector((state)=>state.ticket.viewallTickets)
  const editedTicket =useSelector((state)=>state.ticket.editedTicket)
  const editTicketId =useSelector((state)=>state.ticket.editTicketId)
  const attachments = useSelector((state) => state.ticket.attachments);
  const editStatus =useSelector((state)=>state.ticket.editStatus)
  const {allUsers}=useSelector((state)=>state.ticket);
  const [employeeObj, setEmployeeObj] = useState(null)
  const [requestorEmail, setRequestorEmail] = useState([])
  const [startDate, setStartDate] = useState(dayjs());
  const [file, setFile] = useState([])
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [softCopyObj, setSoftCopyObj] = useState(null)
  const [ticketvalue, setTicketvalue] = useState({
    assignee:"",
    requester: "",
    category: "",
    subcategory: "",
    item: "",
    impact: "",
    site: "",
    subject: "",
    priority: "",
    status: "",
    notificationMode: "",
    group: "",
    technician: "",
    description: "",
    additionalEmails: [],
    // createdDate: "",
    startDate: startDate,
    endDate: endDate,
    dueBy: "",
    attachments: null,

  })

  const handleClose = () => dispatch(actions.closeFulldialogue());

  // To fetch all the users in the drodown
  React.useEffect(() => {
    let debounce = false
    if(openTicket){
      if(debounce) return;
      dispatch(actions.fetchallUsers())
    }
    return(()=>{ debounce = true})
  }, [openTicket])

  React.useEffect(()=>{
    if(editedTicket && editedTicket !=null && typeof editStatus == 'string'){
      if(editStatus && editStatus == 'EDIT' && allUsers != null && Array.isArray(allUsers)){
        setSoftCopyObj({...editedTicket})
        setTicketvalue({...ticketvalue,
            assignee:editedTicket?.assigneeUserId,
            requester: editedTicket.requester ? editedTicket.requester : "",
            category: editedTicket.category ? editedTicket.category : "",
            subcategory: editedTicket.subCategory ? editedTicket.subCategory : "",
            item: editedTicket.item ? editedTicket.item : "",
            impact: editedTicket.impact ? editedTicket.impact :"",
            site: editedTicket.site ? editedTicket.site :"",
            subject: editedTicket.subject ? editedTicket.subject : "",
            priority: editedTicket.priority ? editedTicket.priority : "",
            status: editedTicket.status ? editedTicket.status :"",
            notificationMode: editedTicket.notificationMode ? editedTicket.notificationMode : "",
            group: editedTicket.group ? editedTicket.group : "",
            technician: editedTicket.technician ? editedTicket.technician :"",
            description: "",
            additionalEmails: [],
            // createdDate: "",
            startDate: editedTicket.startDate ? dayjs(editedTicket.startDate) : "",
            endDate: editedTicket.dueDate ? dayjs(editedTicket.dueDate) : "",
            dueBy: "",
            attachments: null,
        })
        setEndDate(editedTicket.dueDate ? dayjs(editedTicket.dueDate) : "");
        setStartDate(editedTicket.startDate ? dayjs(editedTicket.startDate) : "");
        let filterDetail=allUsers?.find((element)=> element.email == editedTicket.requester);
        console.log('individual object__',filterDetail)
        setEmployeeObj(filterDetail && filterDetail instanceof Object ? filterDetail : {})
      }
    }else if(editedTicket == null){
        resetFunctionform()
    }
  
  },[editedTicket,editStatus,allUsers])

  React.useEffect(() => {
    let filteredEmail=allUsers?.map((item)=>item.email);
    setRequestorEmail(filteredEmail && Array.isArray(filteredEmail) ? filteredEmail : [])
  }, [allUsers])
  

  console.log('all users for render__',editedTicket,editStatus,editTicketId,allUsers)
  console.log('attachments___',attachments)

const RequiredLabel = ({label,mandatory}) => (
  <div
  style={{
        minWidth: "100px",   // ✅ fixed label width
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontWeight: 500,
        fontSize: "14px",
      }}
  >
  <Box display="flex" alignItems="center" mb={0.5}>
    {mandatory &&
    <span style={{ color: 'red', marginRight: 4 }}>*</span>
    }
    <label style={{ fontWeight: 500 }}>{label}</label>
  </Box>
  </div>
);

const handleChange = (e) => {
  const { name, value } = e.target;
  if(name == 'requester'){
    let filterDetail=allUsers.find((element)=> element.email == value);
    setEmployeeObj(filterDetail && filterDetail instanceof Object ? filterDetail : {})
    console.log('one employee__',filterDetail)
  }
  setTicketvalue((prev) => ({ ...prev, [name]: value }));
};

const validate =()=>{
  let val=false;
  let message=''
  if(ticketvalue && ticketvalue.requester.length == 0){
    val=true;
    message="Requestor cannot be empty"
  }
  if(ticketvalue && ticketvalue.category.length == 0){
    val=true;
    message="Category cannot be empty"
  }
   if(ticketvalue && ticketvalue.subcategory.length == 0){
    val=true;
    message="Sub Category cannot be empty"
  }
   if(ticketvalue && ticketvalue.impact.length == 0){
    val=true;
    message="Impact cannot be empty"
  }
    if(ticketvalue && ticketvalue.site.length == 0){
    val=true;
    message="Site cannot be empty"
  }
  if(ticketvalue && ticketvalue.subject.length == 0){
    val=true;
    message="Subject cannot be empty"
  }
  if(ticketvalue && ticketvalue.priority.length == 0){
    val=true;
    message="Priority cannot be empty"
  }
  if(ticketvalue && ticketvalue.status.length == 0){
    val=true;
    message="Status cannot be empty"
  }
  if(ticketvalue && ticketvalue.notificationMode.length == 0){
    val=true;
    message="Mode cannot be empty"
  }
  if(ticketvalue && ticketvalue.assignee.toLowerCase() == ticketvalue.requester.toLowerCase()){
    val=true;
    message="Requester and assignee cannot be equal"
  }
  return {message:message,status:val && val == true ? "error" :"success"}
}

const handleSaveChanges = (e)=>{
  e.preventDefault();
  let wrappedEmail= ticketvalue.additionalEmails.map((item)=>item.value)
  let formvalidate=validate();
  if(formvalidate && formvalidate.status == "success"){
  let documentsArray=[];
  if(attachments && Array.isArray(attachments) && attachments.length > 0){
    documentsArray={data:[...attachments]};
    console.log('formatted documents___',formatDocuments(attachments),attachments);
  }
   let ticketObj ={
    assigneeUserId:ticketvalue.assignee,
    createdBy:`${userProfileData?.firstName} ${userProfileData?.lastName}`,
    requester: ticketvalue.requester,
    category: ticketvalue.category,
    subCategory:ticketvalue.subcategory,
    item: ticketvalue.item,
    impact: ticketvalue.impact,
    site: ticketvalue.site,
    subject: ticketvalue.subject,
    priority: ticketvalue.priority,
    status: ticketvalue.status,
    notificationMode: ticketvalue.notificationMode,
    groupName: ticketvalue.group,
    technician: ticketvalue.technician,
    // description: ticketvalue.description,
    ticketDetail: {
    "content": ""
    },
    userEmailIdToNotify: [...wrappedEmail],
    // createdDate: "",
    startDate:new Date(startDate),
    dueDate:new Date(endDate),
    // startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") :"",
    // endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") :"",
    // dueBy: ticketvalue.dueBy,
    documents:attachments && Array.isArray(attachments) && attachments.length > 0 ? formatDocuments(attachments) : [],
  }
  // dispatch(actions.createTicket(obj))
  if(editStatus && editStatus == 'CREATE'){
    createTicketService(ticketObj).then((res)=>{
       if(res && (res?.success)){
         resetFunctionform()
         dispatch(actions.closeFulldialogue())
         dispatch(actions.openSnackbar({message:res?.message,status:'success'}))
         dispatch(actions.viewAllTicket(0,5))
         // viewAllTicketService(0,5).then((response)=>{
         //   if(response && Array.isArray(response.content)){
         //     console.log('store each ticket data__',response?.content)
         //     dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
         //     }
         // }).catch((err)=>{
         //   dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
         // })
       }else{
           return
       }
     }).catch((err)=>{
           dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
     })
   console.log('ticket details creation__',userProfileData);
  }else if(editStatus && editStatus == 'EDIT'){
    let diffKeyMaker=getChangedFields(softCopyObj,ticketObj);
    console.log('see the diff___',diffKeyMaker,softCopyObj)
      editTicketService(diffKeyMaker,editTicketId).then((response)=>{
        if(response && response.success){
         dispatch(actions.closeFulldialogue())
         dispatch(actions.viewAllTicket(0,5))
         dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
         resetFunctionform()
        }
      }).catch((err)=>{
         dispatch(actions.closeFulldialogue())
         dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
         dispatch(actions.viewAllTicket(0,5))
        //  resetFunctionform()
      })
  }else{
    return
  }
  }else{
    dispatch(actions.openSnackbar({message:formvalidate?.message,status:'error'}))
    return
  }
  
}

const resetFunctionform = ()=>{
  setTicketvalue({
    assignee:"",
    requester: "",
    category: "",
    subcategory:"",
    item: "",
    impact: "",
    site: "",
    subject: "",
    priority: "",
    status: "",
    notificationMode: "",
    group: "",
    technician: "",
    description: "",
    additionalEmails: [],
    // createdDate: "",
    // startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") :"",
    // endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") :"",
    startDate: dayjs(),
    endDate: dayjs().add(1, "day"),
    dueBy: ticketvalue.dueBy,
    attachments: [],
  })
  setStartDate(dayjs());
  setEndDate(dayjs().add(1, "day"));
  setFile([]);
  setEmployeeObj(null)
}

 const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRemoveFiles = (filex)=>{
    console.log(filex,file)
    if(filex){
      let deleteFile=file.filter((item)=> item.file.name != filex.name)
      setFile([...deleteFile])
    }else{
      return
    }
  }

  return (
    <Dialog 
       slots={{
          transition: Transition,
        }}
      fullScreen 
      open={openTicket}
      onClose={handleClose}>
      {/* Top Bar */}
      <AppBar sx={{ position: "relative", backgroundColor: "#f06c35" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={()=>{
            // if(editStatus && editStatus == 'CREATE'){
              // }
            resetFunctionform()
            dispatch(actions.editStatusChecker(''));
            dispatch(actions.closeFulldialogue())
            }}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Ticket Properties
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={handleClose}>
            Save
          </Button> */}
        </Toolbar>
      </AppBar>

      {/* Content */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          {/* Header */}
          <Header>
            <div>
              <span>Request ID :</span>
              <strong style={{ marginLeft: 6 }}>{editTicketId}</strong>
            </div>
            {/* <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label>Template</label>
              <Select size="small" defaultValue="Default Request" style={{ width: 170 }}>
                <MenuItem value="Default Request">Default Request</MenuItem>
              </Select>
            </div> */}
          </Header>

          {/* Main Card */}
          <Card>
            {/* Requester */}
            <Box display="flex" gap={2} mb={2.5}>
              <RequiredLabel label="Requester" mandatory={'required'}/>
              <FormControl sx={{width:"40%"}} margin="normal" variant="outlined">
                    <Select
                      defaultValue=""
                      name="requester"
                      value={ticketvalue.requester}
                      onChange={handleChange}
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Requester</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {requestorEmail && requestorEmail.map((item)=>(
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
              {/* <TextField label="Requester" size="small" /> */}
              
            </Box>
            
              <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:'12px'}}>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Name :<span> { employeeObj && employeeObj != null  ? `${employeeObj?.firstName != undefined  ? employeeObj?.firstName : "-"} ${employeeObj?.lastName != undefined ? employeeObj?.lastName : ""}` : "-"}</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Email :<span> { employeeObj && employeeObj != null  ? employeeObj?.email != undefined ? employeeObj?.email : "-" : "-"}</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Contact :<span>{ employeeObj && employeeObj != null ? employeeObj?.phoneNumber != undefined ? employeeObj?.phoneNumber :"-": "-"}</span></p>
                <p style={{ color: "#888",marginRight: "4px",fontSize:"18px"}}>Job Title :<span> Dummy title</span></p>
              </div>
            
            {/* Left + Right */}
            <Box display="flex" gap={4}>
              {/* Left */}

              {/* category */}
              <Box flex={1}>
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center", width: "100%"}}>
                  <RequiredLabel label={'Category'} mandatory={'required'}/>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="category"
                      defaultValue=""
                      value={ticketvalue.category}
                      onChange={handleChange}
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Category</span>
                      }
                      >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Software">Software</MenuItem>
                      <MenuItem value="Hardware">Hardware</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                {/* Subcategory */}
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center", width: "100%"}}>
                  <RequiredLabel label={'Sub Category'} mandatory={'required'}/>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="subcategory"
                      value={ticketvalue.subcategory}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Subcategory</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Software">Oracle</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>
                  {/* item */}
                  <Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",gap:"10px", width: "100%"}}>
                    <RequiredLabel label={'Item'}/>
                    <TextField 
                      name="item"
                      label="Item" 
                      value={ticketvalue.item}
                      onChange={handleChange}
                      fullWidth 
                      margin="normal" 
                      />
                  </Box>

                {/* Impact */}
                   <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center",  width: "100%"}}>
                    <RequiredLabel label={'Impact'} mandatory={'required'}/>
                    <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="impact"
                      value={ticketvalue.impact}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                      selected !== "" ? selected : <span style={{ color: "#aaa" }}>Impact</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Single user">Single user</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                  {/* site */}
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center" ,  width: "100%"}}>
                  <RequiredLabel label={'Site'} mandatory={'required'}/>
                  <TextField 
                    name="site"
                    value={ticketvalue.site}
                    onChange={handleChange}
                    label="Site" 
                    fullWidth 
                    margin="normal" 
                  />
                </Box>

                {/* Subject */}
                <Box sx={{display:"flex",justifyContent:"center",gap:"8px",alignItems:"center",  width: "100%"}}>
                  <RequiredLabel label={'Subject'} mandatory={'required'}/>
                    <TextField 
                        name="subject"
                        value={ticketvalue.subject}
                        onChange={handleChange}
                        label="Subject"
                        sx={{ width: "100%" }}
                        margin="normal"
                        // defaultValue="Oracle Access"
                    />

                </Box>
              </Box>

              {/* Right */}
              <Box flex={1}>
                {/* Assigned to */}
                 <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center",  width: "100%"}}>

                    <RequiredLabel label="Assigned To" mandatory="required" />
                    <FormControl fullWidth margin="normal" variant="outlined">
                       <Select
                      defaultValue=""
                      name="assignee"
                      value={ticketvalue.assignee}
                      onChange={handleChange}
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Assigned To</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {requestorEmail && requestorEmail.map((item)=>(
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
      
                    </FormControl>
                  </Box>
                {/* Priority Status */}
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center",  width: "100%"}}>
                  <RequiredLabel label={'Priority'} mandatory={'required'}/>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="priority"
                      value={ticketvalue.priority}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Select Priority</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                      <MenuItem value="HIGH">HIGH</MenuItem>
                      <MenuItem value="LOW">LOW</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                {/* Status */}
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center" ,  width: "100%"}}>
                  <RequiredLabel label={'Status'} mandatory={'required'}/>
                    <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="status"
                      value={ticketvalue.status}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Status</span>
                      }
                      >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="CREATED">CREATED</MenuItem>
                      <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>
                      <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                      <MenuItem value="RESPONDED">RESPONDED</MenuItem>
                      <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                      <MenuItem value="CLOSED">CLOSED</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                  {/* Mode */}
                  <Box sx={{display:"flex" ,justifyContent:"center",gap:"8px",alignItems:"center" ,  width: "100%"}}>
                  <RequiredLabel label={'Mode'} mandatory={'required'}/>

                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="notificationMode"
                      value={ticketvalue.notificationMode}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Mode</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Email">Email</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                  {/* Group */}
                  <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center" ,  width: "100%"}}>
                    <RequiredLabel label={'Group'} />
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <Select
                      name="group"
                      value={ticketvalue.group}
                      onChange={handleChange}
                      defaultValue=""
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? selected : <span style={{ color: "#aaa" }}>Group</span>
                      }
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Application Support">Application Support</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>
                  {/* Technician */}
                  <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center",  width: "100%"}}>
                    <RequiredLabel label={'Technician'} />
                    <TextField 
                      name="technician"
                      value={ticketvalue.technician}
                      onChange={handleChange}
                      label="Technician" 
                      fullWidth 
                      margin="normal" 
                    />
                </Box>
              </Box>
            </Box>

            {/* Description React Quill*/}
            <Box mt={3}>
              <Typography sx={{fontWeight: 500}}><label><b>Description</b></label></Typography>
                <TextEditor/>
              {/* <TextField fullWidth multiline minRows={5} /> */}
            </Box>
              <Box mt={8}>
                <div style={{textAlign:"left"}}>
                  <Typography><b>{"Email Id's to notiy"}</b></Typography>
                </div>
                {/* Multiple Emails */}
                <Box sx={{gap:"10px",  width: "100%"}}>
                <Selected 
                  sx={{width:"100%"}}
                  name="additionalEmails"
                  value={ticketvalue.additionalEmails}
                  onChange={(selectedOptions) => {
                    setTicketvalue((prev) => ({ ...prev, additionalEmails: selectedOptions }));
                  }}
                  styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: "50px",   // height of the select box
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          minHeight: "50px",   // keeps content aligned
                        }),
                        input: (provided) => ({
                          ...provided,
                          minHeight: "50px",
                        }),
                      }}
                  components={animatedComponents}  
                  isMulti 
                  placeholder="Select or enter Email id's"
                  options={requestorEmail && requestorEmail.length> 0 && requestorEmail.map((item)=> {
                    if(item){
                      return { value : item,label :item }
                    }
                  })} 
                />

                </Box>
              </Box>
            {/* Dates */}
            <Box display="flex" gap={3} mt={3}>
              <Box flex={1}>
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center",  width: "100%"}}>
                  <RequiredLabel label={'Created Date'}/>
                <TextField 
                  name="createdDate"
                  value="Jul 1, 2025 03:10 PM"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                </Box>
                {/* <Typography>Created Date</Typography> */}
              </Box>
              <Box flex={1}>
                 <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center",  width: "100%"}}>
                  <RequiredLabel label={'Start Date'}/>
                <DatePicker
                  name="startDate"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{ textField: { fullWidth: true, size: "medium" } }}
                  minDate={dayjs(new Date())} // ✅ Minimum selectable date
                  // maxDate={dayjs().add(30, "day")} // 
                />
                 </Box>
                {/* <Typography>Start Date</Typography> */}
              </Box>
            </Box>

            <Box display="flex" gap={3} mt={3}>
              <Box flex={1}>
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center",  width: "100%"}}>
                <RequiredLabel label={'End Date'}/>
                <DatePicker
                  name="endDate"
                  value={endDate}
                  onChange={setEndDate}
                  minDate={startDate} // ✅ Minimum selectable date
                  maxDate={dayjs().add(30, "day")} // 
                  slotProps={{ textField: { fullWidth: true, size: "medium" } }}
                />
              </Box>
            </Box>
              <Box flex={1}>
                <Box sx={{display:"flex" ,justifyContent:"center",gap:"10px",alignItems:"center",  width: "100%"}}>
                <RequiredLabel label={'Due By'}/>
                <TextField 
                  name="dueBy"
                  value={ticketvalue.dueBy}
                  defaultValue="Jul 3, 2025 03:10 PM" 
                  fullWidth 
                  InputProps={{ readOnly: true }} 
                /> 
                </Box>
              </Box>
            </Box>

            {/* Attachments */}
            <Box mt={3} p={2} border="1px dashed #ccc" borderRadius={4} bgcolor="#fafafa">
              <Typography fontWeight="bold">Attachments</Typography>
              <label style={{ color: "#d9534f", cursor: "pointer" }}>
                Browse Files
                   <input
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files);

                        // ✅ Step 1: Create preview list (for UI)
                        const selectedFiles = files.map((file) => ({
                          file,
                          preview: URL.createObjectURL(file),
                        }));
                        setFile(selectedFiles);

                        // ✅ Step 2: Build FormData
                        const formData = new FormData();
                        files.forEach((file) => {
                          formData.append("files", file); // key name must match backend field
                        });

                        // ✅ Step 3: Dispatch Redux action (sending FormData)
                        dispatch(actions.uploadAttachments(formData));

                        console.log("files___", files);
                      }}
                    />

              </label>{" "}
              or Drag files here | <span style={{ fontSize: "0.9em" }}>Max size: 50 MB.</span>
            </Box>
            <Box>
            
      <FileGrid>
        {file && file.length > 0 && file.map((item, index) => (
          <FileBox key={index}>
            {item.file.type.startsWith("image/") ? (
              <FilePreviewImage
                src={item.preview}
                alt={item.file.name}
              />
            ) : (
              <FileTypeLabel>
                {item.file.name.split(".").pop().toUpperCase()}
              </FileTypeLabel>
            )}

            <FileOverlay className="overlay">
              <IconButton
                title="View"
                onClick={() => window.open(item.preview, "_blank")}
              >
                <VisibilityIcon/>

              </IconButton>
              <IconButton
                title="Download"
                onClick={() => handleDownload(item.file)}
              >
                <FileDownloadIcon/>
              </IconButton>
               <IconButton
                title="Download"
                onClick={() => handleRemoveFiles(item.file)}
              >
                <DeleteIcon/>
              </IconButton>
            </FileOverlay>
          </FileBox>
        ))}
      </FileGrid>
            </Box>

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button onClick={(e) => {
                handleSaveChanges(e)
              }} variant="contained" color="error">
                {editStatus && editStatus == 'EDIT' ? "Update" :"Create"} Ticket
              </Button>
              <Button disabled={editStatus && editStatus == 'EDIT' ? true : false}
               onClick={()=>{
                resetFunctionform()
              }} variant="outlined">Reset</Button>
              <Button 
              onClick={()=>{
                resetFunctionform()
                dispatch(actions.editStatusChecker(''));
                dispatch(actions.closeFulldialogue())
              }}
              variant="outlined">Cancel</Button>
            </Box>
          </Card>
        </Container>
      </LocalizationProvider>
    </Dialog>
  );
}
