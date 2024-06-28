
import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from './store'
import Dashboard from './pages/dashboard/Dashboard'
import AddContact from './components/addContact/AddContact'
import EditContact from './components/editContact/EditContact'
import Contacts from './components/contacts/Contacts'
import Logout from './components/logout/Logout'
import ProtectedRoutes from './components/protectedRoutes';
import NotFound from './pages/notFound/NotFound'

function App() {
 
    const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if(token){
      dispatch(authActions.login())
    }
  },[])
  return (
    <div>
<Toaster/>
       <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard/' element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }>
            <Route index element={<Contacts/>} />
            <Route path='add-contact' element={<AddContact/>} />
            <Route path='edit-contact/:id' element={<EditContact/>} />
          </Route>
          <Route path='/logout' element={<Logout/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
       </Router>
       <Footer/>
    </div>
  )
}

export default App
