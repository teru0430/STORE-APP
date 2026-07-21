import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Mailbox.module.css'
import { GrAmazon } from "react-icons/gr";

export default function Mailbox() {
    const [mails, setMailbox] = useState([]);
    useEffect(() => {
    const UrlList = async() =>{
          try{
              const res = await axios.get('http://localhost:8000/api/priceob/mailbox/' ,null,{withCredentials: true})
              console.log(res.status);
              setMailbox(res.data[0].msg_url);
          }catch(error){
              console.log(error)
          };

    };
    UrlList();
    }, []);
    console.log(mails)
    

    return (
        <>
        <div className={style.mailboxbody}>
            <div className={style.mailform}>
                <h1><span>メール</span>一覧</h1>
                <ul>
                {mails.map((mail)=>(
                    <li key={mail.id} className={mail.message.includes('上') ? style.upprice : style.downprice}>
                        {mail.message}
                        <a href={mail.url.url} target="_blank" rel="noopener noreferrer">
                            <GrAmazon size={35} className={style.urlicon}/>
                        </a>
                        <button onClick={() => console.log(mail.id)}>!!</button>
                    </li>
                ))}
                </ul>

            </div>
        </div>
        </>
    )
    }


