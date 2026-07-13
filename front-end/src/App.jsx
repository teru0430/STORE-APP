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

  const Callapi = async() =>{
      try{
        const res = await api.get('api/users/user-info/');
        setUser(res.data)
        
      }catch(error){
        if (retry){
          retry = false
          try{
            const res = await api.post('api/users/refresh/');
            Callapi()

          }catch(error){
              console.log('loginplz')
              
          }
        };
      };
    };
  useEffect(() => {
    console.log('API')
    
    Callapi()
  },[])
  console.log(user,typeof user.id)
  
  useEffect(() => {
    if (!user.id) return;
    
    const ev = new EventSource(
       `http://localhost:8000/api/priceob/users/${user.id}/events/`,
       { withCredentials: true }
    );
 
    ev.onopen = () => {
      console.log('SSE opened', ev.readyState);
    };

    ev.onerror = e => {
      console.error('SSE error', e, 'readyState', ev.readyState);
    };

    ev.addEventListener('stream-open', e => {
      console.log('stream-open', e.data);
    });

    ev.addEventListener('url_created', e => {
      console.log('url_created event', JSON.parse(e.data));
    });

    ev.addEventListener('test_message', e => {
      console.log('test_message event', JSON.parse(e.data));
    });

    ev.addEventListener("price_down", e => {
      console.log('price_down event', JSON.parse(e.data));
    });

    ev.addEventListener('price_updated', e => {
      console.log('price_updated event', JSON.parse(e.data));
    });

    ev.onmessage = e => {
      console.log('default message', e.data);
    };

    return () => {
      ev.close();
      console.log('SSE closed');
    };
  }, [user.id]); 
  

  

  
  return (
    <BrowserRouter>
      <Header setUser={setUser} user={user}/>
      <Routes>
        <Route  path='/login' element={<Login api={api} setUser={setUser}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Store userID={user.id} />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App
