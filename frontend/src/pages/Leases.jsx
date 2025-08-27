import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Leases(){
  const [leases,setLeases] = useState([])
  const [form,setForm] = useState({ property:'', unitId:'', tenant:'', startDate:'', endDate:'', rent:0, deposit:0 })
  const [properties,setProperties] = useState([])
  const [tenants,setTenants] = useState([])

  const load = async ()=>{
    const [{ data:ls }, { data:ps }, { data:ts }] = await Promise.all([
      api.get('/leases'), api.get('/properties'), api.get('/tenants')
    ])
    setLeases(ls); setProperties(ps); setTenants(ts)
  }
  useEffect(()=>{ load() },[])

  const onSubmit = async (e)=>{
    e.preventDefault()
    await api.post('/leases', form)
    setForm({ property:'', unitId:'', tenant:'', startDate:'', endDate:'', rent:0, deposit:0 })
    load()
  }

  const remove = async (id)=>{
    if(!confirm('Delete lease?')) return
    await api.delete(`/leases/${id}`)
    load()
  }

  return (
    <div>
      <h2>Leases</h2>
      <form onSubmit={onSubmit} className="grid card">
        <select value={form.property} onChange={e=>setForm({...form,property:e.target.value})}>
          <option value="">Select Property</option>
          {properties.map(p=>(<option key={p._id} value={p._id}>{p.name}</option>))}
        </select>
        <input placeholder="Unit ID (from property.units)" value={form.unitId} onChange={e=>setForm({...form,unitId:e.target.value})} />
        <select value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})}>
          <option value="">Select Tenant</option>
          {tenants.map(t=>(<option key={t._id} value={t._id}>{t.name}</option>))}
        </select>
        <input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} />
        <input type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} />
        <input type="number" placeholder="Rent" value={form.rent} onChange={e=>setForm({...form,rent:+e.target.value})} />
        <input type="number" placeholder="Deposit" value={form.deposit} onChange={e=>setForm({...form,deposit:+e.target.value})} />
        <button>Create Lease</button>
      </form>

      <table className="table">
        <thead><tr><th>Property</th><th>Tenant</th><th>Rent</th><th>Start</th><th>End</th><th></th></tr></thead>
        <tbody>
          {leases.map(l=>(
            <tr key={l._id}>
              <td>{l.property?.name || l.property}</td>
              <td>{l.tenant?.name || l.tenant}</td>
              <td>₹ {l.rent}</td>
              <td>{new Date(l.startDate).toLocaleDateString()}</td>
              <td>{new Date(l.endDate).toLocaleDateString()}</td>
              <td><button onClick={()=>remove(l._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
