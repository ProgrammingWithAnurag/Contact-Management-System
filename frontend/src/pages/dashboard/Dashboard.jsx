import React from 'react'
import './Dashboard.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="sidebar-container">
            <Sidebar/>
      </div>
      <div className="contect-container">
            <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard