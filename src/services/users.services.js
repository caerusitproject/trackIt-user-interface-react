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
            let response= await api.post(`/auth/register`,data);
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

export const loginUsersService=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let response= await api.post(`/auth/login`,data);
            if(response && Boolean(response?.data?.success) == true){
                resolve(response?.data)
            }else{
                reject(response.data?.response?.data)
            }
        }catch(err){
                reject(err.response?.data)
        }
    })
}

export const logoutService=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let response = await api.post(`/auth/logout`,data);
             if(response && Boolean(response?.data?.success) == true){
                resolve(response?.data)
            }else{
                reject(response.data?.response?.data)
            }
        }catch(err){
              reject(err.response?.data)
        }
    })
}

export const fetchUserProfileService=()=>{
    return new Promise(async(resolve,reject)=>{
        let userEmail=JSON.parse(localStorage.getItem('user'))
        userEmail=userEmail?.email.trim().toLowerCase()
        try{
            let response = await api.get(`/api/v1/users/email/${userEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access-token")}`
                    }
                }
            );
            if(response && Boolean(response?.data?.status) == true){
                resolve(response?.data)
            }else{ 
                reject(response.data?.response?.data)
            }
        }catch(err){
              reject(err.response?.data)
        }
    })
}