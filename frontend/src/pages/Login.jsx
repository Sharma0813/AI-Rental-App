import React, { useState } from 'react'
import api from '../api'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      location.href='/dashboard'
    }catch(e){
      setMsg(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <div className="alert">{msg || 'Use your email and password.'}</div>
      <form onSubmit={onSubmit} className="grid">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <p>New here? <a href="/register">Register</a></p>
    </div>
  )
}
