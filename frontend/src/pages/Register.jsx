import React, { useState } from 'react'
import api from '../api'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const { data } = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', data.token)
      location.href='/dashboard'
    }catch(e){
      setMsg(e.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <div className="alert">{msg || 'Create your owner account.'}</div>
      <form onSubmit={onSubmit} className="grid">
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Create Account</button>
      </form>
    </div>
  )
}
