import React from 'react'
import { Link } from 'react-router-dom'
import style from './Heder.module.css'
import axios from 'axios'

export default function Header(props) {
    axios.defaults.withCredentials = true
    const {user, setUser} = props;
    const handleSubmit = async(e) =>{
        try{
            const res = await axios.post('http://localhost:8000/api/users/logout/' ,null,{withCredentials: true})
            console.log(res.status);
            setUser({});
            
        }catch(error){
            console.log(error)
        };
        



    };
    return (
    <>
      <div className={style.hederCss}>
        <h3 className={style.htitle}>Arai Games</h3>
        <ul className={style.button}>
            {user?.username?(<div className={style.userspace}>{user.username}</div>):<div className={style.nouser}></div>}
            
            <li className={style.buttonChi}>
                {user?.username? (<button className={style.logout} onClick={()=> handleSubmit()}>ログアウト</button>)
                :(<Link to='/login' className={style.link}>ログイン</Link>)}
                
            </li> 
            <li className={style.buttonChi}>
                <Link to='/' className={style.link}>商品一覧</Link>
                
            </li> 
            <li className={style.buttonChi}>
                <Link to='/login' className={style.link}>ログイン</Link>
            </li>  
        </ul>
      </div>
      
    </>  
    )
}
