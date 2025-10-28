import * as actions from "."
import {createOrEditAssetsItemService,viewAssetService} from "../../services/assets.services"
const EDIT_ASSET_ITEM = 'EDIT_ASSET_ITEM';
const CREATE_ASSET_ITEM = 'CREATE_ASSET_ITEM';
const VIEW_ASSETS = 'VIEW_ASSETS';

export const createOrAssetsItem = (data)=>{
    return (dispatch) => {
        createOrEditAssetsItemService(data).then((response)=>{
            dispatch(viewAssets());
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};

export const viewAssets = ()=>{
    return (dispatch) => {
        viewAssetService().then((response)=>{
            if(response && response.data && (response.data) instanceof Object){
                dispatch({
                    type: VIEW_ASSETS,
                    payload: response.data.content.length > 0 ? response.data.content : [],
                });
            }
            dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
        }).catch((err)=>{
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
        });
    };
};