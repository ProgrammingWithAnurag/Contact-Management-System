import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const dispatch = useDispatch()
 
 
  const logout = () => {
    localStorage.clear("token")
    dispatch(authActions.logout())
}

  return (
    <div className='navbar '>
      <div className="nav-left ">
            <Link to='/' className='nav-brand'>
                  CONTACT MS
            </Link>
      </div>
      <div className="nav-right">
            <Link to='/about' className='nav-link'>About</Link>
            {
              isLoggedIn ? <>
                 <Link to='/dashboard' className='nav-link'>Contact</Link>
                 <Link to='/register' className='nav-link'>{isLoggedIn.username}</Link>
                 <Link to='/logout' className='nav-link' onClick={logout}>Logout</Link>
              </>
              :<>
                 <Link to='/login' className='nav-link'>Login</Link>
                 <Link to='/register' className='nav-link'>Register</Link>
              </>
            }
      </div>
    </div>
  )
}

export default Navbar