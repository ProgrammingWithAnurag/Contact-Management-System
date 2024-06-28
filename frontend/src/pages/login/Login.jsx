import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
// import Validation from '../../components/Validation'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
import { BASE_URL } from '../../service'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values,setValues] = useState({
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    const {name,value} = e.target;
    setValues({...values,[name]:value})
  }

  const submit =async (e) => {
    e.preventDefault();
        try {
          let responseData;
          await fetch(`${BASE_URL}/api/v1/users/login`,{
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(values)
          }).then((res)=>res.json()).then((data)=> responseData = data)
  
          if(responseData.success){
            toast.success("Login Successfully");
            localStorage.setItem("token",responseData.token)
            dispatch(authActions.login())
            setValues({email:"",password:""})
            navigate('/')
          }else{
            toast.error(responseData.error)
          }
        } catch (error) {
          toast.error(error)
        }
    }
  
  return (
    <div className="form-container">
      <form className="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Email</label>
          <input type="email" placeholder='Enter Email-Id' className='form-control' name='email' autoComplete='off' onChange={changeHandler} value={values.email} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Password</label>
          <input type="email" placeholder='********' className='form-control' name='password' onChange={changeHandler} value={values.password} />
        </div>
        <button className='form-btn' onClick={submit}>Login</button>
        <p className='para'>Create new account? <Link to='/register' className='text-blue-300 underline'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login