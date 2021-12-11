import axios from 'axios'

export default class UserService {
    url = process.env.API_URL+':'+process.env.API_PORT+'/users/';
	createdUser(user) {       
    return axios.post(this.url,user,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
        res.data        
      ); 
    }
    getUsers() {  
      
      return axios.get(this.url,{headers: {"Authorization" : `Bearer ${localStorage.token}`}
      }).then(res=>
          res.data        
        ); 
      }

    updateUser(user) {
      return axios.patch(this.url+user.id,user,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
      res.data        
    ); 
  }
  getUser(user) {
    return axios.get(this.url+user.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
    ); 
  }
  deleteUser(user) {
    return axios.delete(this.url+user.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
  ); 
}
getTenants() {
  return axios.get(process.env.API_URL+':'+process.env.API_PORT+'/tenants',{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
  res.data        
); 
}
}
