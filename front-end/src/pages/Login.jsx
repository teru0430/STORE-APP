import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
  const {api, setUser} = props;
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  
  const initialValues = {email: "", password:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
 
  
  const handleChange = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    // console.log(formValues);
  };
  const Callapi = async() =>{
      try{
        const res = await api.get('users/user-info/');
        setUser(res.data)
      }catch(error){
              console.log('loginplz')
      }}; 

  const handleSubmit = async(e) => {
    e.preventDefault();
    //バリデーションチェック
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    const errorCount = Object.keys(errors).length;
    if (errorCount === 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/users/login/', formValues);
        console.log('ログイン成功:', response.data);
        setUser(response.data.user)
        navigate('/');
        // 必要に応じてレスポンスの処理
      } catch (error) {
        console.error('ログイン失敗:', error);
        setFormErrors({ apiError: 'ログインに失敗しました。メールアドレスまたはパスワードを確認してください。' });
      }
      // Callapi()  
      
    };
    
    
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email){
      errors.username = "メールアドレスを入力してください";  
    }
    if (!values.password){
      errors.password = "パスワードを入力してください"; 
    }
    return errors;
  };
  

  return (

    <div className={style.formContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>ログインフォーム</h1>
            <hr/>
            <div className={style.uiForm}>
              <div className={style.formField}>
                <label>Email</label>
                <input type="text" placeholder='Email' name="email" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.username}</p>
              <div className={style.formField}>
                <label>パスワード</label>
                <input type="text" placeholder='パスワード' name="password" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.password}</p>
              <p className={style.errorMsg}>{formErrors.apiError}</p>
              <button className='submitButton'>ログイン</button>
            </div>
          <Link to='/register'>アカウント作成はこちら</Link>
        </form>
        
    </div>
  );
}
