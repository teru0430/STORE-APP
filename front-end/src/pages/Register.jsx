import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  
  const initialValues = {username:"", email: "", password:""};
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
        const response = await axios.post('http://localhost:8000/api/users/register/', formValues);
        console.log('成功:', response.data);
        navigate('/');
        // 必要に応じてレスポンスの処理
      } catch (error) {
        console.error('失敗:', error);
        setFormErrors({ apiError: 'ログインに失敗しました。メールアドレスまたはパスワードを確認してください。' });
      }
      // Callapi()  
      
    };
    
    
  };
  const validate = (values) => {
    const errors = {};
    if (!values.username){
      errors.username = "ユーザーネームを入力してください"
    }
    if (!values.email){
      errors.email = "メールアドレスを入力してください";  
    }
    if (!values.password){
      errors.password = "パスワードを入力してください"; 
    }
    return errors;
  };


  return (

    <div className={style.formContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>新規作成</h1>
            <hr/>
            <div className={style.uiForm}>
              <div className={style.formField}>
                <label>ユーザーネーム</label>
                <input type="text" placeholder='username' name="username" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.username}</p>
              <div className={style.formField}>
                <label>Email</label>
                <input type="text" placeholder='Email' name="email" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.email}</p>
              <div className={style.formField}>
                <label>パスワード</label>
                <input type="text" placeholder='パスワード' name="password" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.password}</p>
              <p className={style.errorMsg}>{formErrors.apiError}</p>
              <button className='submitButton'>作成</button>
            </div>

        </form>
    </div>
  );
}
