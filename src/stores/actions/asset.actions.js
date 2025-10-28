import * as actions from "."
import { createOrEditAssetService } from "../../services/assets.services"

export const createOrEditAsset = (data)=>{
    return (dispatch) => {
        createOrEditAssetService(data).then((response)=>{
            dispatch(viewAssets());
        })
    }
}