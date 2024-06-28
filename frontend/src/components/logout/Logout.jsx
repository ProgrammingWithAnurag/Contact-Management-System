import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
      const MySwal = withReactContent(Swal)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      
      MySwal.fire({
            title: "Are you sure?",
            text: "Do You Want to Exit?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Want!"
          }).then((result) => {
            if (result.isConfirmed) {
                  localStorage.clear("token")
                  navigate('/')
            }
          });
}

export default Logout