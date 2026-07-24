import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Posturl.module.css'
import { useNavigate } from 'react-router-dom';
export default function Posturl() {
  
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  const initialValues = {title: "", url:""};
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
        const response = await axios.post('http://localhost:8000/api/priceob/urls/', formValues);
        console.log('成功:', response.data);
        navigate('/');
        // 必要に応じてレスポンスの処理
      } catch (error) {
        console.error('失敗:', error);
        setFormErrors({ apiError: '失敗しました。' });
      }
      // Callapi()  
      
    };
    
    
  };
  const validate = (values) => {
    const errors = {};
    if (!values.title){
      errors.title = "タイトルを入力してください";  
    }
    if (!values.url){
      errors.url = "URLを入力してください"; 
    }
    if (!values.url.includes("https://www.amazon.co.jp")){
      errors.url = "amazonの商品のみです。"; 
    }
    return errors;
  };


  return (

    <div className={style.formContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>価格追跡リスト</h1>
            <hr/>
            <div className={style.uiForm}>
              <div className={style.formField}>
                <label>タイトル</label>
                <input type="text" placeholder='タイトル' name="title" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.title}</p>
              <div className={style.formField}>
                <label>URL</label>
                <input type="text" placeholder='URL' name="url" onChange={(e) => handleChange(e)}/>
              </div>
              <p className={style.errorMsg}>{formErrors.url}</p>
              <p className={style.errorMsg}>{formErrors.apiError}</p>
              <button className='submitButton'>保存</button>
            </div>

        </form>
    </div>
  );
  
}
