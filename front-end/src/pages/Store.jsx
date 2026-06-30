import React, { useEffect } from 'react'
import styles from './Store.module.css'
import Image from '../assets/hurimesi.jpg'

export default function Store() {
  const userId = 20;

  useEffect(() => {
    const ev = new EventSource(
      `http://localhost:8000/api/priceob/users/${userId}/events/`,
      { withCredentials: true }
    );

    ev.onopen = () => {
      console.log('SSE opened', ev.readyState);
    };

    ev.onerror = e => {
      console.error('SSE error', e, 'readyState', ev.readyState);
    };

    ev.addEventListener('stream-open', e => {
      console.log('stream-open', e.data);
    });

    ev.addEventListener('url_created', e => {
      console.log('url_created event', JSON.parse(e.data));
    });

    ev.addEventListener('test_message', e => {
      console.log('test_message event', JSON.parse(e.data));
    });

    ev.onmessage = e => {
      console.log('default message', e.data);
    };

    return () => {
      ev.close();
      console.log('SSE closed');
    };
  }, [userId]);

  return (
    <div className={styles.goodslist}>
      <h1 className={styles.title}>商品一覧</h1>
      <hr/>
      <div className={styles.body}>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
      <div className={styles.productItem}>
        
          <div className={styles.productImage}>
            <img src={Image} alt="商品名3" />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>商品名が入ります（ここに商品名）</h3>
            <p className={styles.productPrice}>¥12,000 (税込)</p>
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
    </div>
    </div>
    
  )
}
