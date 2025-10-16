import {fetchAllEmailUsers,createTicketService,viewAllTicketService} from "../../services/tickets.services"
import * as actions from "../actions"
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const FETCH_ALL_TICKETS = 'FETCH_ALL_TICKETS';
export const OPEN_FULL_DIALOGUE = 'OPEN_FULL_DIALOGUE';
export const CLOSE_FULL_DIALOGUE = 'CLOSE_FULL_DIALOGUE';
export const SELECT_TICKET_FOR_EDIT = 'SELECT_TICKET_FOR_EDIT';


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

export const closeFulldialogue = ()=>{
    return (dispatch) => {
        dispatch({
            type:CLOSE_FULL_DIALOGUE,
        })
    }
}

export const viewAllTicket = (page,pageSize)=>{
    return (dispatch) => {
        // const offset = page * pageSize;
        viewAllTicketService(page,pageSize).then((response)=>{
             if(response && Array.isArray(response.content)){
                console.log('store each ticket data__',response)
                dispatch({
                    type:FETCH_ALL_TICKETS,
                    payload:response
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