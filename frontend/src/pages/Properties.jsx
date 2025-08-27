import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Properties(){
  const [items,setItems] = useState([])
  const [form,setForm] = useState({ name:'', type:'apartment', city:'' })

  const fetchAll = async ()=>{
    const { data } = await api.get('/properties')
    setItems(data)
  }
  useEffect(()=>{ fetchAll() },[])

  const onSubmit = async (e)=>{
    e.preventDefault()
    const payload = {
      name: form.name,
      type: form.type,
      address: { city: form.city }
    }
    await api.post('/properties', payload)
    setForm({ name:'', type:'apartment', city:'' })
    fetchAll()
  }

  const remove = async (id)=>{
    if(!confirm('Delete property?')) return
    await api.delete(`/properties/${id}`)
    fetchAll()
  }

  return (
    <div>
      <h2>Properties</h2>
      <form onSubmit={onSubmit} className="form-row card">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="duplex">Duplex</option>
          <option value="commercial">Commercial</option>
        </select>
        <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
        <button>Add</button>
      </form>

      <div className="grid">
        {items.map(p=>(
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.type} · {p.address?.city || '-'}</p>
            <button onClick={()=>remove(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
