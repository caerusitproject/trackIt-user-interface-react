const EDIT_CATEGORY_ITEM = 'EDIT_CATEGORY_ITEM';
const CREATE_CATEGORY_ITEM = 'CREATE_CATEGORY_ITEM';
const VIEW_CATEGORIES = 'VIEW_CATEGORIES';
const VIEW_SUB_CATEGORIES = 'VIEW_SUB_CATEGORIES';
import * as actions from "."
import {createOrEditCategoryItemService,createOrEditSubcategoryItemService,viewCategoriesService,viewSubcategoriesService} from "../../services/assets.services"

export const createOrEditCategoryItem = (data)=>{
    return (dispatch) => {
        createOrEditCategoryItemService(data).then((response)=>{
            dispatch(viewCategories());
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
            // dispatch({
            //     type: response.data.id ? EDIT_CATEGORY_ITEM : CREATE_CATEGORY_ITEM,
            //     payload: response.data
            // });
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};

export const createOrEditSubcategoryItem = (data)=>{
    return (dispatch) => {
        createOrEditSubcategoryItemService(data).then((response)=>{
            dispatch(viewSubcategories(data.categoryId));
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
            // dispatch({
            //     type: response.data.id ? EDIT_CATEGORY_ITEM : CREATE_CATEGORY_ITEM,
            //     payload: response.data
            // });
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};

export const viewCategories = ()=>{
    return (dispatch) => {
        viewCategoriesService().then((response)=>{
            if(response && response.data && (response.data) instanceof Object){
                dispatch({
                    type: VIEW_CATEGORIES,
                    payload: response.data.content.length > 0 ? response.data.content : [],
                });
            }
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};

export const viewSubcategories = (categoryId)=>{
    return (dispatch) => {
        viewSubcategoriesService(categoryId).then((response)=>{
            if(response && response.data && (response.data) instanceof Object){
                dispatch({
                    type: VIEW_SUB_CATEGORIES,
                    payload: response.data.content.length > 0 ? response.data.content : [],
                });
            }
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};
