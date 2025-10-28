import api from "../Config/axiosinstance"
let token=localStorage.getItem('access-token')
let xCorrelationId=localStorage.getItem('X-Correlation-Id')

export const createOrEditAssetsItemService = (data) => {
    return new Promise (async(resolve, reject)=>{
        try{
            let response;
            if(data.id){
                response = await api.patch(`/api/v1/assets/${data.id}`, data, {
                    Authorization: `Bearer ${token}`
                });
            } else{
                response = await api.post(`/api/v1/assets`, data, {
                    Authorization: `Bearer ${token}`
                });
            }
            if(response && response.data.success){
                resolve(response.data)
            } else{
                reject(response)
            }
        } catch(err){
            reject(err)
        }
    })
}


export const viewAssetService = ()=>{
    return new Promise (async(resolve, reject)=>{
        try{
            let response = await api.get(`/api/v1/assets`, {
                Authorization:`Bearer ${token}`
            });
            if(response && response.data.success){
                resolve(response.data)
            } else{
                reject(response)
            }
        } catch(err){
            reject(err)
        }
    })
}