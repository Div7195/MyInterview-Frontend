//API_NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'Loading..',
        message:'Data is being loaded, please wait..'
    },
    success:{
        title:'success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'error',
        message:'An error occurred while fetching response from the server'
    },
    requestFailure:{
        title:'error',
        message:'An error occurred while parsing request data'
    },
    networkError:{
        title:'error',
        message:'Unable to connect with the server, please check internet connectivity and try again later'
    },
    
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL: { url:'/' , method:'POST/GET/PUT/DELETE' , params: true/false , query:true/false }


export const SERVICE_URLS={
    userSignup:{
        url:'/signup',
        method:'POST'
    },
    userLogin:{
        url:'/login',
        method:'POST'
    },
    uploadFile: { 
        url: '/file/upload',
        method:'POST'
    },

    createPost : {
        url: 'create',
        method: 'POST'
    },
    getAllPosts : {
        url : '/posts',
        method : 'GET',
        params : true,
        
    },
    getMyPosts : {
        url: '/personal/posts',
        method: 'GET',
        params : true,
    },
    getPostById : {
        url : '/post',
        method : 'GET',
        query : true,
        
    },
    updatePost : {
        url : 'update',
        method : 'PUT',
        query : true
    },
    deletePost : {
        url : 'delete',
        method : 'DELETE',
        query : true
    },
    getComments : {
        url : 'comments',
        method : 'GET',
        query : true,
    },
    createComment : {
        url: 'postcomment',
        method: 'POST'
    },
    createCompany : {
        url:'createcompany',
        method:'POST'
    },
    findCompany : {
        url:'/companyImage',
        method:'GET',
        params : true,
    }

}