import React from 'react'
import styles from './Store.module.css'
import Image from '../assets/hurimesi.jpg'

export default function Store() {
  return (
    <>
      <h1 className={styles.title}>商品一覧</h1>
      <hr/>
      <body className={styles.body}>
      <div className={styles.productContainer}>
      <div className={styles.productItem}>
          <div className={styles.productImage}>
            <img src={Image} alt="商品名1" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥3,000 (税込)</p>
          </div>
      </div>
      
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名2" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥5,500 (税込)</p>
          </div>
        
      </div>

      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
          </div>
        
      </div>
    </div>
    </body>
    </>
    
  )
}
