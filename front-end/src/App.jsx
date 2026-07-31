import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import useSWR from 'swr';
import Store from './pages/Store';
import Header from './pages/Header';
import Mailbox from './pages/Mailbox';
import Posturl from './pages/Posturl';
// import api from './api';


function App() {
  axios.defaults.withCredentials = true
  const api = axios.create({
  baseURL: 'http://localhost:8000/',withCredentials: true,  
  });
  let retry = true
  const [user, setUser] = useState({})
  const [mails, setMailbox] = useState([]);
  const [mailid, setmailid] = useState();

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

  const UrlList = async() =>{
            try{
                const res = await api.get('api/priceob/mailbox/')
                console.log(res.data[0].id);
                setMailbox(res.data[0].msg_url);
                setmailid(res.data[0].id)
            }catch(error){
                console.log(error)
            };
  
      };

  useEffect(() => {
    console.log('API')
    Callapi();
    UrlList();
  },[])
  useEffect(() => {
    UrlList();
  },[user])
  console.log(user,typeof user.id)
  console.log(mails)
  
     

  
  return (
    <BrowserRouter>
      <Header setUser={setUser} user={user} mails={mails}/>
      <Routes>
        <Route  path='/login' element={<Login api={api} setUser={setUser}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Store user={user} />} />
        <Route path='/mailbox' element={<Mailbox mails={mails} id={mailid} setmailbox={setMailbox}/>} />
        <Route path='/post' element={<Posturl  />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App
