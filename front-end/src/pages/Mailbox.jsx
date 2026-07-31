import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Mailbox.module.css'
import { GrAmazon } from "react-icons/gr";


export default function Mailbox(props) {
    axios.defaults.withCredentials = true
    const {mails, id, setmailbox} = props;
    const Updata = async(id, mailid) =>{
        console.log('id',id, 'mailid',mailid)
        try{
            const res = await axios.put(`http://localhost:8000/api/priceob/mailbox/${id}/`,{pk:mailid},{withCredentials: true});
        }catch(e){
            console.log(e);
        }
    };
    
    
    const handleclick =(mailid) =>{
        const newmails= mails.map(item =>{
            if (item.id === mailid){
                return {... item, is_read: true};
            }
            return item;
        });
        setmailbox(newmails)
        Updata(id, mailid)
    }

    
    return (
        <>
        <div className={style.mailboxbody}>
            <div className={style.mailform}>
                <h1><span>メール</span>一覧</h1>
                <p>※メールの期間は一週間です。</p>
                <h3>{mails.length > 0 ? '': 'まだメールがありません'}</h3>
                <ul>
                {mails.map((mail)=>(
                    <li key={mail.id} className={Number(mail.message) > mail.url.price  ? style.upprice : style.downprice}>
                        {!mail.is_read ? <span className={style.isread} onClick={()=> handleclick(mail.id)}>●</span>:''}
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


