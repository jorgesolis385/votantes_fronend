import axios from 'axios'

export default class TenantService {
  
	createdTenant(tenant) {       
    return axios.post('http://localhost:8080/tenants',tenant,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
        res.data        
      ); 
    }
    getTenants() {  
      
      return axios.get('http://localhost:8080/tenants',{headers: {"Authorization" : `Bearer ${localStorage.token}`}
      }).then(res=>
          res.data        
        ); 
      }

    updateTenant(tenant) {
      return axios.patch('http://localhost:8080/tenants/'+tenant.id,tenant,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
      res.data        
    ); 
  }
  getTenant(tenant) {
    return axios.get('http://localhost:8080/tenants/'+tenant.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
    ); 
  }
  deleteTenant(tenant) {
    return axios.delete('http://localhost:8080/tenants/'+tenant.id,{headers: {"Authorization" : `Bearer ${localStorage.token}`}}).then(res=>
    res.data        
  ); 
}
}
