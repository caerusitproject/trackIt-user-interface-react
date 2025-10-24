import {fetchAllEmailUsers,createTicketService,viewAllTicketService,filterAllTicketService,uploadAttachmentsTicketService} from "../../services/tickets.services"
import * as actions from "../actions"
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const FETCH_ALL_TICKETS = 'FETCH_ALL_TICKETS';
export const OPEN_FULL_DIALOGUE = 'OPEN_FULL_DIALOGUE';
export const CLOSE_FULL_DIALOGUE = 'CLOSE_FULL_DIALOGUE';
export const SELECT_TICKET_FOR_EDIT = 'SELECT_TICKET_FOR_EDIT';
export const EDIT_STATUS_CHECK = 'EDIT_STATUS_CHECK';
export const FILTER_ALL_TICKETS = 'FILTER_ALL_TICKETS';
export const STORE_PAGINATION = 'STORE_PAGINATION';


export const fetchallUsers = () => {
    return (dispatch) => {
        fetchAllEmailUsers().then((res)=>{
            if(res && Array.isArray(res?.content)){
                // console.log('all users____',res)
                dispatch({
                    type: FETCH_ALL_USERS,
                    payload:res?.content
                })
            }else{
                return
            }
        }).catch((err)=>{
             dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        })
    }
}

// openFulldialogue

export const openFulldialogue = ()=>{
    return (dispatch) => {
        dispatch({
            type:OPEN_FULL_DIALOGUE,
        })
    }
}

export const selectTicketForEdit = (ticketId) => ({
  type: SELECT_TICKET_FOR_EDIT,
  payload: ticketId
});

export const editStatusChecker = (status) => ({
  type: EDIT_STATUS_CHECK,
  payload: status
});
// editStatusChecker

export const closeFulldialogue = ()=>{
    return (dispatch) => {
        dispatch({
            type:CLOSE_FULL_DIALOGUE,
        })
    }
}

export const filterTickets = (status,priority,category,subCategory,page,pageSize)=>{
    return (dispatch) => {
        filterAllTicketService(status,priority,category,subCategory,page,pageSize).then((response)=>{
             if(response && response.data && response.data instanceof Object){
                console.log('filter ticket table',response.data)
                 dispatch({
                    type:FETCH_ALL_TICKETS,
                    payload:response.data
                })
                dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
             }else{
                return
             }
    }).catch((err)=>{
          dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
    })
  }
}

export const viewAllTicket = (page,pageSize)=>{
    return (dispatch) => {
        // const offset = page * pageSize;
        viewAllTicketService(page,pageSize).then((response)=>{
             if(response && response.data && response.data instanceof Object){
                console.log('store each ticket data__',response)
                dispatch({
                    type:FETCH_ALL_TICKETS,
                    payload:response.data
                })
                dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
            }
            else{
                return
            }
        }).catch((err)=>{
              dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        })
    }
}

export const storePagination = (page,pageSize)=>{
    return (dispatch) => {
        dispatch({
            type: STORE_PAGINATION,
            payload: { page: page, pageSize: pageSize }
        })
    }
}

export const uploadAttachments = (files)=>{
    return (dispatch) => {
        uploadAttachmentsTicketService(files).then((response)=>{
            if(response && response.data && Array.isArray(response.data)){
                dispatch({
                    type: 'UPLOAD_ATTACHMENTS',
                    payload: response.data
                })
                 dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
            }
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        })  
    }
}