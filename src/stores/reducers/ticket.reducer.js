// src/reducers/userReducer.js
const initialState = {
 allUsers:[],
 ticketObj:null,
 loading:false,
 viewallTickets:null,
 openTicket:false,
 actionStatus:null,
 editedTicket:null,
 editStatus:null,
 editTicketId:null
};

export const ticketReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS':
      return { ...state, loading: true, allUsers: action.payload };

    case 'CREATE_TICKET':
      return { ...state, loading: true, ticketObj: action.payload };

    case 'FETCH_ALL_TICKETS':
      return { ...state, loading: true, viewallTickets: action.payload };

    case 'OPEN_FULL_DIALOGUE':
      return { ...state, loading: true, openTicket: true};

    case 'CLOSE_FULL_DIALOGUE':
      return { ...state, loading: true, openTicket: false };

    case 'EDIT_STATUS_CHECK':
      return { ...state, loading: true, editStatus: action.payload , editedTicket : action.payload == 'CREATE' ? null:state.editedTicket};

    case 'SELECT_TICKET_FOR_EDIT':
       console.log('ticket reducers',state.viewallTickets)
      return { ...state, 
        openTicket:true, 
        editedTicket:state.viewallTickets?.content.find((ele)=>ele.id == action.payload),
        editTicketId:action.payload
      };

      
    default:
      return state;
  }
};
