import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Properties from './pages/Properties.jsx'
import Tenants from './pages/Tenants.jsx'
import Leases from './pages/Leases.jsx'
import Payments from './pages/Payments.jsx'
import Maintenance from './pages/Maintenance.jsx'

const Private = ({ children })=>{
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

const Nav = ()=>{
  const navigate = useNavigate()
  const loggedIn = !!localStorage.getItem('token')
  const logout = ()=>{ localStorage.removeItem('token'); navigate('/login') }
  return (
    <div className="nav">
      <strong>🏠 Rental Manager</strong>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/properties">Properties</Link>
      <Link to="/tenants">Tenants</Link>
      <Link to="/leases">Leases</Link>
      <Link to="/payments">Payments</Link>
      <Link to="/maintenance">Maintenance</Link>
      <span className="grow"></span>
      {loggedIn ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </div>
  )
}

export default function App(){
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
          <Route path="/properties" element={<Private><Properties/></Private>} />
          <Route path="/tenants" element={<Private><Tenants/></Private>} />
          <Route path="/leases" element={<Private><Leases/></Private>} />
          <Route path="/payments" element={<Private><Payments/></Private>} />
          <Route path="/maintenance" element={<Private><Maintenance/></Private>} />
        </Routes>
      </div>
    </>
  )
}
