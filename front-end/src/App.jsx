import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import api from './api';


function App() {
  axios.defaults.withCredentials = true

  // useEffect(()=> {
  //   const getMe = async () =>{
  //     const res = await fetch('http://127.0.0.1:8000/accounts/me/',{headers:{
  //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgwNzQ1NjAwLCJpYXQiOjE3ODA3NDUzMDAsImp0aSI6IjFlNDA5NGM5ZTM5OTQ4ZWY5ZDU4ZTc3MWUxMWQ2ZTdjIiwidXNlcl9pZCI6IjEifQ.fj3RYB7-6JFckozh8vHnisWQGOeX66w70wltWFDX5Do`
  //     }});
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   getMe()
  // },[]);
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // axios.defaults.withCredentials = true;
  // useEffect(() => {
  //   // useEffectの直後に直接 async をつけるのはNGなため、内部で関数を作ります
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:8000/api/token/',{"username": "banana",
  //   "password": "wasd0123"});
  //       setUsers(response.data); // 成功時にデータをセット
  //       console.log('ログイン成功',response.data)
  //     } catch (error) {
  //       console.error('データ取得に失敗しました:', error); // エラー処理
  //     } finally {
  //       setLoading(false); // 成功・失敗に関わらずローディングを終了
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // if (loading) return <div>ロード中...</div>;

  // async function getSecretData() {
  // try {
  //   //  ヘッダーの設定なしで、そのままGETリクエストを送る
  //   const response = await axios.get('http://localhost:8000/api/secret/');
    
  //   // クッキーの中のトークンが自動でDjangoに届き、認証が成功する！
  //   console.log('秘密のデータ:', response.data);
  // } catch (error) {
  //   console.error('アクセス拒否されました（未ログインなど）:', error);
  // }
  // }
  // getSecretData()

    // 1. 画面の状態を管理する3つの箱（State）を用意
  const [data, setData] = useState(null);         // 取得したデータをいれる箱
  const [isLoading, setIsLoading] = useState(true); // ローディング中かどうかのフラグ
  const [error, setError] = useState(null);       // エラーをいれる箱

  // 2. データを取得する関数
  const loadSecretData = async () => {
    try {
      setIsLoading(true); // 通信開始時にローディングをONにする
      
      const response = await api.get('/api/secret/');

      const res = await api.get('/goods/');
      
      setData(response.data); // データを箱にいれる
      console.log(response.data,res.data)
      setError(null);         // エラーをクリア
    } catch (err) {
      // リフレッシュすら失敗して、完全にログイン期限が切れた場合はここに飛ぶ
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false); // 成功・失敗に関わらず通信が終わったらローディングをOFFにする
    }
  };

  // 3. 画面が読み込まれた瞬間に、1回だけデータ取得関数を実行する
  useEffect(() => {
    loadSecretData();
  }, []); // 空の配列を入れることで「初回のみ実行」になる

  // 4. 通信中の画面表示
  if (isLoading) {
    return <div>データを読み込み中...</div>;
  }

  // 5. エラーが起きた場合の画面表示
  if (error) {
    return (
      <div style={{ color: 'red' }}>
        エラーが発生しました: {error}
      </div>
    );
  }

  return (
    <>
    
      <h1>
        test
      </h1>
    
    
    </>
  );
}

export default App
