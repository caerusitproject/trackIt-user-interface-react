
export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';

export const setMenuItems = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_MENU_ITEMS',
            payload: data
        })
    }
}