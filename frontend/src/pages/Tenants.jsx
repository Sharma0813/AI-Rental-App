import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Tenants(){
  const [items,setItems] = useState([])
  const [form,setForm] = useState({ name:'', email:'', phone:'' })

  const fetchAll = async ()=>{
    const { data } = await api.get('/tenants')
    setItems(data)
  }
  useEffect(()=>{ fetchAll() },[])

  const onSubmit = async (e)=>{
    e.preventDefault()
    await api.post('/tenants', form)
    setForm({ name:'', email:'', phone:'' })
    fetchAll()
  }

  const remove = async (id)=>{
    if(!confirm('Delete tenant?')) return
    await api.delete(`/tenants/${id}`)
    fetchAll()
  }

  return (
    <div>
      <h2>Tenants</h2>
      <form onSubmit={onSubmit} className="form-row card">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <button>Add</button>
      </form>

      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
        <tbody>
          {items.map(t=>(
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td><button onClick={()=>remove(t._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
