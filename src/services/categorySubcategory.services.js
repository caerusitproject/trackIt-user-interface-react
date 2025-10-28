import api from "../Config/axiosinstance"
let token=localStorage.getItem('access-token')
let xCorrelationId=localStorage.getItem('X-Correlation-Id')

export const createOrEditCategoryItemService = (data)=>{
    return new Promise (async(resolve,reject)=>{
        try{
            let response;
            if(data.id){
                // Edit Category Item
                 response = await api.patch(`/api/v1/categories/${data.id}`,data,{
                    // "X-Correlation-Id":xCorrelationId,
                     Authorization:`Bearer ${token}`
                });
            }else{
                 response = await api.post(`/api/v1/categories`,data,{
                    // "X-Correlation-Id":xCorrelationId,
                     Authorization:`Bearer ${token}`
                });
            }
           if(response && response.data.success){
            resolve(response.data)
           }else{
                reject(response)
           }
        }catch(err){
             reject(err)
        }
    })
        
}

export const createOrEditSubcategoryItemService = (data)=>{
    return new Promise (async(resolve,reject)=>{
        try{
            let response;
            if(data.subcategoryId){
                // Edit Category Item
                 response = await api.patch(`/api/v1/categories/${data.categoryId}/subcategories/${data.subcategoryId}`,data,{
                    // "X-Correlation-Id":xCorrelationId,
                     Authorization:`Bearer ${token}`
                });
            }else{
                 response = await api.post(`/api/v1/categories/${data.categoryId}/subcategories`,data,{
                    // "X-Correlation-Id":xCorrelationId,
                     Authorization:`Bearer ${token}`
                });
            }
           if(response && response.data.success){
            resolve(response.data)
           }else{
                reject(response)
           }
        }catch(err){
             reject(err)
        }
    })
        
}

export const viewCategoriesService = ()=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.get(`/api/v1/categories`,{
                // "X-Correlation-Id":xCorrelationId,
                 Authorization:`Bearer ${token}`
           });
           if(response && response.data.success){
            resolve(response.data)
           }else{
                reject(response)
           }
        }catch(err){
             reject(err)
        }
    })

}

export const viewSubcategoriesService = (categoryId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.get(`/api/v1/categories/${categoryId}/subcategories`,{
                // "X-Correlation-Id":xCorrelationId,
                 Authorization:`Bearer ${token}`
           });
           if(response && response.data.success){
            resolve(response.data)
           }else{
                reject(response)
           }
        }catch(err){
             reject(err)
        }
    })

}

export const deleteCategoryService = (categoryId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
           let response = await api.delete(`/api/v1/categories/${categoryId}`,{
                // "X-Correlation-Id":xCorrelationId,
                 Authorization:`Bearer ${token}`
           });
           if(response && response.status){
            resolve(response)
           }else{
                reject(response)
           }
        }catch(err){
             reject(err)
        }
    })

}   
        