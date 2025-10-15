import {fetchAllEmailUsers,createTicketService} from "../../services/tickets.services"
import * as actions from "../actions"
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const CREATE_TICKET = 'CREATE_TICKET';


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

// export const createTicket = (ticketObj)=>{
//     return (dispatch) => {
//         createTicketService(ticketObj).then((res)=>{
//             if(res && (res?.status)){
//                 dispatch(actions.openSnackbar({message:res?.message,status:'success'}))
//             }else{
//                 return
//             }
//         }).catch((err)=>{
//               dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
//         })
//     }
// }