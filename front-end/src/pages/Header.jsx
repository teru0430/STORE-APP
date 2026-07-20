import React, { cache, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Heder.module.css'
import axios from 'axios'
import { FaEnvelope } from "react-icons/fa6";
import Modal from 'react-modal';


export default function Header(props) {
    axios.defaults.withCredentials = true
    const {user, setUser} = props;
    const [isOpen, setOpen] = useState(false);
    let ref = true
    const handleSubmit = async() =>{
        try{
            const res = await axios.post('http://localhost:8000/api/users/logout/' ,null,{withCredentials: true})
            console.log(res.status);
            setUser({});
            setOpen(false);
            
        }catch(error){
            console.log('error',error);
            console.log(ref,'ref')
            if(ref){
                try{
                    const respons = await axios.post('http://localhost:8000/api/users/refresh/',null,{withCredentials: true})
                    console.log('refresh',respons.status)
                    handleSubmit()
                }catch(e){
                    console.log(e)
                }
            };
        };
    };
    return (
    <>
      <div className={style.hederCss}>
        <h3 className={style.htitle}>Arai Games</h3>
        <ul className={style.button}>
            {user?.username?(<div className={style.userspace}>{user.username}</div>):<div className={style.nouser}></div>}
            
            <li className={style.buttonChi}>
                {user?.username? (<button className={style.logout} onClick={()=> setOpen(true)}>ログアウト</button>)
                :(<Link to='/login' className={style.linkLogin}>ログイン</Link>)}
                
            </li> 
            <li className={style.buttonChi}>
                <Link to='/' className={style.link}>追跡一覧</Link>
                
            </li>   
             <li className={style.buttonChi}>
                <Link to='/mailbox'>
                    <FaEnvelope className={style.mail} size={30}/>
                </Link>
             </li>
        </ul>
      </div>
        <Modal isOpen={isOpen} className={style.modal}>
            <h2><span>本当</span>にログアウトしますか？</h2>
            <div>
                <button className={style.cancel} onClick={() => setOpen(false)}>キャンセル</button>
                <button className={style.modallogout} onClick={() => handleSubmit()}>ログアウト</button>
            </div>
        </Modal>
      
    </>  
    )
}
