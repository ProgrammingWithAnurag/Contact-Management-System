import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { BASE_URL } from '../../service'

const Register = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username: "",
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    const {name,value} = e.target;
    setValues({...values,[name]:value})
  }


  const submit = async(e) =>{
    e.preventDefault();
      try {
        let responseData;
        await fetch(`${BASE_URL}/api/v1/users/register`,{
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(values)
        }).then((res)=>res.json()).then((data)=> responseData = data)

        if(responseData.success){
          toast.success("Account Created Successfully");
          setValues({username:"",email:"",password:""})
          navigate('/login')
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
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="username" className='form-label'>Username</label>
          <input type="text" placeholder='Enter Username' className='form-control' name='username' onChange={changeHandler} value={values.username} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Email</label>
          <input type="email" placeholder='Enter Email-Id' className='form-control' name='email' autoComplete='off' onChange={changeHandler} value={values.email} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Password</label>
          <input type="email" placeholder='********' className='form-control' name='password' onChange={changeHandler} value={values.password} />
        </div>
        <button className='form-btn' onClick={submit}>Register</button>
        <p className='para'>Already have an account? <Link to='/login' className='text-blue-300 underline'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register