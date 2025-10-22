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

export const filterAllTicketService = (status,priority,category,subCategory,offset,limit)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let API=''
             if (status && priority && category && subCategory) {
                    API = `api/v1/tickets?status=${status}&priority=${priority}&category=${category}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                }
                // 3 filters
                else if (status && priority && category) {
                    API = `api/v1/tickets?status=${status}&priority=${priority}&category=${category}&page=${offset}&size=${limit}`;
                } else if (status && priority && subCategory) {
                    API = `api/v1/tickets?status=${status}&priority=${priority}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                } else if (status && category && subCategory) {
                    API = `api/v1/tickets?status=${status}&category=${category}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                } else if (priority && category && subCategory) {
                    API = `api/v1/tickets?priority=${priority}&category=${category}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                }
                // 2 filters
                else if (status && priority) {
                    API = `api/v1/tickets?status=${status}&priority=${priority}&page=${offset}&size=${limit}`;
                } else if (status && category) {
                    API = `api/v1/tickets?status=${status}&category=${category}&page=${offset}&size=${limit}`;
                } else if (status && subCategory) {
                    API = `api/v1/tickets?status=${status}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                } else if (priority && category) {
                    API = `api/v1/tickets?priority=${priority}&category=${category}&page=${offset}&size=${limit}`;
                } else if (priority && subCategory) {
                    API = `api/v1/tickets?priority=${priority}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                } else if (category && subCategory) {
                    API = `api/v1/tickets?category=${category}&subCategory=${subCategory}&page=${offset}&size=${limit}`;
                }
                // 1 filter
                else if (status) {
                    API = `api/v1/tickets?status=${status}&page=${offset}&size=${limit}`;
                } else if (priority) {
                    API = `api/v1/tickets?priority=${priority}&page=${offset}&size=${limit}`;
                } else if (category) {
                    API = `api/v1/tickets?category=${category}&page=${offset}&size=${limit}`;
                } else if (subCategory) {
                    API = `api/v1/tickets?subCategory=${subCategory}&page=${offset}&size=${limit}`;
                }
                // no filters
                else if (
                    (!status || status.length === 0) &&
                    (!priority || priority.length === 0) &&
                    (!category || category.length === 0) &&
                    (!subCategory || subCategory.length === 0)
                ) {
                    API = `api/v1/tickets?page=${offset}&size=${limit}`;
                }  
            console.log('API____',API)
           let response = await api.get(API,{
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