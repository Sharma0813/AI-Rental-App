import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Maintenance(){
  const [items,setItems] = useState([])
  const [form,setForm] = useState({ property:'', title:'', description:'', priority:'medium' })
  const [properties,setProperties] = useState([])

  const load = async ()=>{
    const [{ data:ms }, { data:ps }] = await Promise.all([ api.get('/maintenance'), api.get('/properties') ])
    setItems(ms); setProperties(ps)
  }
  useEffect(()=>{ load() },[])

  const onSubmit = async (e)=>{
    e.preventDefault()
    await api.post('/maintenance', form)
    setForm({ property:'', title:'', description:'', priority:'medium' })
    load()
  }

  const updateStatus = async (id, status)=>{
    await api.put(`/maintenance/${id}`, { status })
    load()
  }

  return (
    <div>
      <h2>Maintenance</h2>
      <form onSubmit={onSubmit} className="grid card">
        <select value={form.property} onChange={e=>setForm({...form,property:e.target.value})}>
          <option value="">Select Property</option>
          {properties.map(p=>(<option key={p._id} value={p._id}>{p.name}</option>))}
        </select>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button>Create Ticket</button>
      </form>

      <div className="grid">
        {items.map(m=>(
          <div className="card" key={m._id}>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
            <p>Priority: {m.priority} · Status: {m.status}</p>
            <div className="form-row">
              <button onClick={()=>updateStatus(m._id,'in-progress')}>Start</button>
              <button onClick={()=>updateStatus(m._id,'closed')}>Close</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
