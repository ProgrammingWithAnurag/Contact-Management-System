import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6';
import { BASE_URL } from '../../service';

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contacts/update-contact/`+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Berear ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(values)
      });
      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Contact Updated Successfully");
        setValues({ name: "", email: "", phone: "", address: "" });
        navigate('/dashboard');
      } else {
        toast.error(responseData.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect( () => {
      fetch(`${BASE_URL}/api/v1/contacts/contact/`+id, {
            method: 'GET',
            headers: {
                  Authorization: `Berear ${localStorage.getItem("token")}`
            },
            
      }).then((res)=> res.json()).then((data) => {
            if(data.success){
                  console.log(data)
                  setValues({name:data.name,email:data.email,phone:data.phone,address:data.address})
            }
      })
      
}, [])

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={submit}>
        <h2>Edit Contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input type="text" placeholder='Enter Name' className='form-control' name='name' onChange={changeHandler} value={values.name} />
        </div>
        <div className="form-group">
          <FaAt />
          <input type="email" placeholder='Enter Email-Id' className='form-control' name='email' autoComplete='off' onChange={changeHandler} value={values.email} />
        </div>
        <div className="form-group">
          <FaPhoneFlip />
          <input type="text" placeholder='Enter Phone Number' className='form-control' name='phone' onChange={changeHandler} value={values.phone} />
        </div>
        <div className="form-group">
          <FaRegAddressCard />
          <input type="text" placeholder='Enter Address' className='form-control' name='address' onChange={changeHandler} value={values.address} />
        </div>
        <button type="submit" className='form-btn'>Update</button>
      </form>
    </div>
  );
};

export default EditContact;
