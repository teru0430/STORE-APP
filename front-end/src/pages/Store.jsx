import React, { useEffect, useState } from 'react'
import styles from './Store.module.css'
import Image from '../assets/hurimesi.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Store() {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const UrlList = async() =>{
          try{
              const res = await axios.get('http://localhost:8000/api/priceob/urls/' ,null,{withCredentials: true})
              console.log(res.status);
              setUrls(res.data);
          }catch(error){
              console.log(error)
          };

      };
    UrlList();
  }, []);
  console.log(urls)
  
  const handleDelete = (id) => {
    console.log('削除するID:', id);
  };
  return (
    <>
      <div className={styles.goodslist}>
      <h1 className={styles.title}>商品一覧</h1>
      <hr/>
      <Link to='/post' className={styles.link}> ＋ </Link>
        <ul>
          {urls.map((url) => (
            <li key={url.id} >
              <h3>{url.title}</h3>
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                サイトへ行く
              </a>
              <p>{url.price}円</p> 
              <button onClick={() => handleDelete(url.id)}>削除</button>   
            </li>
          ))}
        </ul>
      </div>    
    </>
    
  )
}
