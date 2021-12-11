import axios from 'axios'

export default class LoginService {
  /*const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
  };*/
  
	getAuthLogin(name,pass) {    
    return axios.post('http://localhost:8080/auth/login',{
      client_id: "webapp",
      client_secret: "saqw21!@",
      username: name,
      password: pass
    }).then(res=>
        res.data        
      ); 
    }
    getAuthToken(code,name) {
		return axios.post('http://localhost:8080/auth/token',{
      code: code,
      clientId: "webapp",
      username: name
    }).then(res => res.data );
    }
 

    getCustomersLarge() {
		return axios.get('data/customers-large.json').then(res => res.data.data);
    }

    getCustomersXLarge() {
		return axios.get('data/customers-xlarge.json').then(res => res.data.data);
	}
}
