import api from "../Config/axiosinstance"
let token=localStorage.getItem('access-token')

export const fetchAllEmailUsers = ()=>{
    return new Promise (async(resolve,reject)=>{
        try{
            let request =await api.get('api/v1/users',{
                Authorization:`Bearer ${token}`
            })
            if(request && request.status){
                resolve(request.data)
            }else{
                reject(request.data)
            }
        }catch(err){
             reject(err)
        }
    })
        
}

export const viewAllTicketService = ()=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.get(`/api/v1/tickets`,{
                Authorization:`Bearer ${token}`
           });
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



export const createTicketService = (data)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.post(`/api/v1/tickets`,data,{
                Authorization:`Bearer ${token}`
           });
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