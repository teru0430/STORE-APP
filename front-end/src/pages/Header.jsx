import React from 'react'
import { Link } from 'react-router-dom'
import style from './Heder.module.css'


export default function Header(props) {
    const {user} = props;
    return (
    <>
      <div className={style.hederCss}>
        <div className={style.userspace}>
            {user ? user.username:'ゲスト'}
        </div>
        <ul className={style.button}>
            <li className={style.buttonChi}>
                <Link to='/login' className={style.link}>ログイン</Link>
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
