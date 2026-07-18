import React, { useEffect, useState } from 'react'
import styles from './Store.module.css'
import Image from '../assets/hurimesi.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { GrAmazon } from "react-icons/gr";

export default function Store() {
  const [urls, setUrls] = useState([{id:1, title: "test", url: "test.com", price: 100},
                                    {id:2, title: "test2", url: "test.com", price: 450},
                                    {id:3, title: "test3", url: "test.com", price: 4450},
                                    {id:4, title: "test3", url: "test.com", price: 4450},
                                    {id:5, title: "test3", url: "test.com", price: 4450},
                                    {id:6, title: "test3", url: "test.com", price: 4450},
                                    {id:7, title: "test3", url: "test.com", price: 4450},
                                    {id:8, title: "testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", url: "test.com", price: 4450},]);
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
      <h1 className={styles.title}><span className={styles.Mid}>追跡</span><span className={styles.bot}>商品</span>一覧</h1>
      <hr/>
      <Link to='/post' className={styles.link}> ＋ </Link>
        <ul className={styles.urlbody}>
          <h2>{urls.length > 0? urls.length+'件の商品が登録されています':'好きな商品を追加してみよう'}</h2>
          {urls.map((url) => (
            <li key={url.id} className={styles.urllist}>
              <h3 className={styles.urltitle}>{url.title}</h3>
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                <GrAmazon size={35} className={styles.urlicon}/>
              </a>
              <p className={styles.urlprice}>{url.price}円</p> 
              <button className={styles.urlbutton} onClick={() => handleDelete(url.id)}>✕</button>   
            </li>
          ))}
        </ul>
      </div>    
    </>
    
  )
}
