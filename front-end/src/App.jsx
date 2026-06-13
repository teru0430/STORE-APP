import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import useSWR from 'swr';
import Store from './pages/Store';
import Header from './pages/Header';
// import api from './api';


function App() {
  axios.defaults.withCredentials = true
  const api = axios.create({
  baseURL: 'http://localhost:8000/',withCredentials: true,  
  });
  let retry = true
  const [user, setUser] = useState({})
  useEffect(() => {
    console.log('API')
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
    Callapi()
  },[])
  console.log(user)
  
  
  

  

  
  return (
    <BrowserRouter>
      <Header user={user}/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Store />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App
