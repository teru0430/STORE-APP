import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
// import api from './api';


function App() {
  axios.defaults.withCredentials = true

  const initialValues = {username: "", password:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
 
  
  const handleChange = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    // console.log(formValues);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //バリデーションチェック
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    const errorCount = Object.keys(errors).length;
    if (errorCount === 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', formValues);
        console.log('ログイン成功:', response.data);
        // 必要に応じてレスポンスの処理
      } catch (error) {
        console.error('ログイン失敗:', error);
      }
    };
    
    
  };
  const validate = (values) => {
    const errors = {};
    if (!values.username){
      errors.username = "ユーザー名を入力してください";  
    }
    if (!values.password){
      errors.password = "パスワードを入力してください"; 
    }
    return errors;
  };

  
  
  

    // 1. 画面の状態を管理する3つの箱（State）を用意
  // const [data, setData] = useState(null);         // 取得したデータをいれる箱
  // const [isLoading, setIsLoading] = useState(true); // ローディング中かどうかのフラグ
  // const [error, setError] = useState(null);       // エラーをいれる箱

  // // 2. データを取得する関数
  // const loadSecretData = async () => {
  //   try {
  //     setIsLoading(true); // 通信開始時にローディングをONにする
      
  //     const response = await api.get('/api/secret/');

  //     const res = await api.get('/goods/');
      
  //     setData(response.data); // データを箱にいれる
  //     console.log(response.data,res.data)
  //     setError(null);         // エラーをクリア
  //   } catch (err) {
  //     // リフレッシュすら失敗して、完全にログイン期限が切れた場合はここに飛ぶ
  //     setError(err.response?.data?.message || err.message);
  //   } finally {
  //     setIsLoading(false); // 成功・失敗に関わらず通信が終わったらローディングをOFFにする
  //   }
  // };

  // // 3. 画面が読み込まれた瞬間に、1回だけデータ取得関数を実行する
  // useEffect(() => {
  //   loadSecretData();
  // }, []); // 空の配列を入れることで「初回のみ実行」になる

  // // 4. 通信中の画面表示
  // if (isLoading) {
  //   return <div>データを読み込み中...</div>;
  // }

  // 5. エラーが起きた場合の画面表示
  // if (error) {
  //   return (
  //     <div style={{ color: 'red' }}>
  //       エラーが発生しました: {error}
  //     </div>
  //   );
  // }

  return (
    <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>ログインフォーム</h1>
            <hr/>
            <div className="uiForm">
              <div className="formField">
                <label>ユーザー名</label>
                <input type="text" placeholder='ユーザー名' name="username" onChange={(e) => handleChange(e)}/>
              </div>
              <p className='errorMsg'>{formErrors.username}</p>
              <div className="formField">
                <label>パスワード</label>
                <input type="text" placeholder='パスワード' name="password" onChange={(e) => handleChange(e)}/>
              </div>
              <p className='errorMsg'>{formErrors.password}</p>
              <button className='submitButton'>ログイン</button>
            </div>

        </form>
    </div>
  );
}

export default App
