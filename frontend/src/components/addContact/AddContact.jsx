import React, { useState } from 'react'
import './AddContact.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {FaAt,FaPhoneFlip,FaRegAddressCard,FaUserPlus} from 'react-icons/fa6'
import { BASE_URL } from '../../service'

const AddContact = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const changeHandler = (e) => {
    const {name,value} = e.target;
    setValues({...values,[name]:value})
  }

  
  const submit = async(e) =>{
    e.preventDefault();
      try {
        let responseData;
        await fetch(`${BASE_URL}/api/v1/contacts/add-contact`,{
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            Authorization:`Berear ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(values)
        }).then((res)=>res.json()).then((data)=> responseData = data)

        if(responseData.success){
          toast.success("Contact Added Successfully");
          setValues({username:"",email:"",phone:"",address:""})
          navigate('/dashboard')
        }else{
          toast.error(responseData.error)
        }
      } catch (error) {
        toast.error(error)
      }
  }

  return (
    <div className="add-form-container">
      <form className="add-form">
        <h2>Add Contact</h2>
        <div className="form-group">
            <FaUserPlus/>
          <input type="text" placeholder='Enter Name' className='form-control' name='name' onChange={changeHandler} value={values.name} />
        </div>
        <div className="form-group">
            <FaAt/>
          <input type="email" placeholder='Enter Email-Id' className='form-control' name='email' autoComplete='off' onChange={changeHandler} value={values.email} />
        </div>
        <div className="form-group">
            <FaPhoneFlip/>
          <input type="text" placeholder='Enter Phone Number' className='form-control' name='phone' onChange={changeHandler} value={values.phone} />
        </div>
        <div className="form-group">            
            <FaRegAddressCard/>
          <input type="text" placeholder='Enter Address' className='form-control' name='address' onChange={changeHandler} value={values.address} />
        </div>
        <button className='form-btn' onClick={submit}>Add</button>
      </form>
    </div>
  )
}

export default AddContact