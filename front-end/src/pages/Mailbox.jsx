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
                    <li key={mail.id} className={Number(mail.message) > mail.url.price  ? style.upprice : style.downprice}>
                        <span className={style.title}>{mail.url.title}</span>の値段が<span className={style.price}>{mail.url.price}円</span><span className={Number(mail.message) > mail.url.price  ? style.upspan : style.downspan}>ーーー＞</span><span className={style.price}>{mail.message}円</span>
                        <a className={style.link} href={mail.url.url} target="_blank" rel="noopener noreferrer">
                            <GrAmazon size={35} className={style.urlicon}/>
                        </a>
                       
                    </li>
                ))}
                </ul>

            </div>
        </div>
        </>
    )
    }


