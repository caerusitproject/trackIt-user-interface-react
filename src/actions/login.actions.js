
const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR';
const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const TOGGLE_SIDE_NAVBAR = 'TOGGLE_SIDE_NAVBAR';


export const openSnackbar=(data)=>{
    return(dispatch=>{
        dispatch({
            type:OPEN_SNACK_BAR,
            payload:{message:data.message,status:data.status}
        })
    })
}

export const openCollapsed=(data)=>{
    return(dispatch=>{
        dispatch({
            type:TOGGLE_SIDE_NAVBAR,
            payload:data
        })
    })
}

export const closeSnackbar=()=>{
    return(dispatch=>{
        dispatch({
            type:CLOSE_SNACK_BAR,
        })
    })
}

export const loginSucess = (userData)=>{
     return(dispatch=>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:userData
        })
    })
}

export const logout = ()=>{
     return(dispatch=>{
        dispatch({
            type:LOGOUT,
        })
    })
}