import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Mailbox() {
    const [mails, setMailbox] = useState([]);
    useEffect(() => {
    const UrlList = async() =>{
          try{
              const res = await axios.get('http://localhost:8000/api/priceob/mailbox/' ,null,{withCredentials: true})
              console.log(res.status);
              setMailbox(res.data);
          }catch(error){
              console.log(error)
          };

    };
    UrlList();
    }, []);
    console.log(mails)


    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <div>Mailbox</div>
        </>
    )
    }


