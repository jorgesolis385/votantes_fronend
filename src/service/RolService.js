import axios from 'axios'

export default class RolService {
    url = 'http://localhost:8080/roles/';
    base_url = 'http://localhost';
    port = ':8080'
	createdRol(roles) {       
    return axios.post(this.url,roles,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
        res.data        
      ); 
    }
    getRols() {  
      
      return axios.get(this.url,{headers: {"Authorization" : `Bearer ${localStorage.token}`}
      }).then(res=>
          res.data        
        ); 
      }

    updateRol(roles) {
      return axios.patch(this.url+roles.id,roles,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
      res.data        
    ); 
  }
  getRol(roles) {
    return axios.get(this.url+roles.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
    ); 
  }
  deleteRol(roles) {
    return axios.delete(this.url+roles.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
  ); 
}
getPermissions() {
  return axios.get('data/permissions.json').then(res => res.data.data);
}

}
