import api from "../Config/axiosinstance"
let token=localStorage.getItem('access-token')
let xCorrelationId=localStorage.getItem('X-Correlation-Id')

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

export const viewAllTicketService = (offset,limit)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.get(`/api/v1/tickets?page=${offset}&size=${limit}`,{
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

export const deleteTicketService = (ticketId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.delete(`/api/v1/tickets/${ticketId}`,{
                // "X-Correlation-Id":xCorrelationId,
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

export const editTicketService = (data,ticketId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.patch(`/api/v1/tickets/${ticketId}`,data,{
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