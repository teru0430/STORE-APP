// src/api.js
import axios from 'axios';

axios.defaults.withCredentials = true
const api = axios.create({
baseURL: 'http://localhost:8000/',withCredentials: true,  
});
let retry = true
const Callapi = async() =>{
      try{
        const res = await api.get('accounts/me/');
        setUser(res.data)
        
      }catch(error){
        if (retry){
          retry = false
          try{
            const res = await api.post('api/token/refresh/');
            Callapi()

          }catch(error){
              console.log('loginplz')
              
          }
        };
      };
    };
export default api

