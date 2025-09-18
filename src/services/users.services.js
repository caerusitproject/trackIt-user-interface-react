import api from "../Config/axiosinstance"

export function fetchUserService(){

    // taking and handling inputs from dispatch call
    return new Promise(async(resolve,reject)=>{
        try{
            let response = await api.get(`/posts`);
            if(response && response.status){
                resolve(response.data)
            }else{
                reject(response.data)
            }
        }catch(err){
            reject(err)
        }
    })
}


export const storeRegisterUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
             let response= await api.post(`/gateway/auth/register`,data);
            if(response && (response?.data?.success)){
                resolve(response?.data)
            }else{
                reject(response.data?.response?.data)
            }
        }catch(err){
                reject(err.response?.data)
        }
    })
}