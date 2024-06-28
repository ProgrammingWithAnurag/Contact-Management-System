import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6'
import './Contacts.css'
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BASE_URL } from '../../service'

const customStyles = {
      headCells: {
            style: {
                  fontSize: 15 + "px",
                  fontWeight: 600
            },
      },
      cells: {
            style: {
                  fontSize: 13 + "px",
                  fontWeight: 500
            }
      }
}

const MySwal = withReactContent(Swal)
const Contacts = () => {
      const [contacts,setContacts] = useState([])
      const [loading,setLoading] = useState(false)


      const deleteRecord = (id) => {
            MySwal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`${BASE_URL}/api/v1/contacts/contact/${id}`, {
                              method: 'DELETE',
                              headers: {
                                    Authorization: `Berear ${localStorage.getItem("token")}`
                              },      
                        }).then((res)=>res.json()).then((data)=> {
                              setContacts(data.contacts);
                              MySwal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                              });
                        })
                        
                        .catch((err) => {
                              MySwal.fire({
                                    title: "Error!",
                                    text: "Error Occured.",
                                    icon: "error"
                              });
                        })
                   
                  }
                });
      }

      const columns = [
            {
                  name: 'Name',
                  selector: (row) => row.name
            },
            {
                  name: 'Email',
                  selector: (row) => row.email
            },
            {
                  name: 'Phone',
                  selector: (row) => row.phone
            },
            {
                  name: 'Action',
                  selector: (row) => <>
                     <Link to={`/dashboard/edit-contact/${row._id}`}><FaPenToSquare className='table-icon1'/></Link>
                     <FaRegTrashCan className='table-icon2' onClick={() => deleteRecord(row._id)}/>
                  </>
            }
      ]
    
            useEffect( () => {
                  setLoading(true)
                  fetch(`${BASE_URL}/api/v1/contacts/contacts`, {
                        method: 'GET',
                        headers: {
                              Authorization: `Berear ${localStorage.getItem("token")}`
                        },
                        
                  }).then((res) => res.json()).then((data) => setContacts(data.contacts))
                  setLoading(false)
            }, [])

      return (
          <>
          {
            loading ? (
            <CircleLoader
             loading={loading}
             size={50}
             aria-label='Loading Spinner'
             data-testid="loader"
            />
            ) : (
            <div className='contact-list'>
                  <DataTable 
                   columns={columns}
                   data={contacts}
                   customStyles={customStyles}
                   pagination
                  />
                
            </div>
            )
          }
       </>
      )
}

export default Contacts