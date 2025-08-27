import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Payments(){
  const [items,setItems] = useState([])
  const [leases,setLeases] = useState([])
  const [form,setForm] = useState({ lease:'', amount:0, method:'bank', reference:'' })

  const load = async ()=>{
    const [{ data:ps }, { data:ls }] = await Promise.all([ api.get('/payments'), api.get('/leases') ])
    setItems(ps); setLeases(ls)
  }
  useEffect(()=>{ load() },[])

  const onSubmit = async (e)=>{
    e.preventDefault()
    await api.post('/payments', form)
    setForm({ lease:'', amount:0, method:'bank', reference:'' })
    load()
  }

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={onSubmit} className="grid card">
        <select value={form.lease} onChange={e=>setForm({...form,lease:e.target.value})}>
          <option value="">Select Lease</option>
          {leases.map(l=>(<option key={l._id} value={l._id}>
            {l.property?.name || l.property} → {l.tenant?.name || l.tenant}
          </option>))}
        </select>
        <input type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:+e.target.value})} />
        <select value={form.method} onChange={e=>setForm({...form,method:e.target.value})}>
          <option value="bank">Bank</option>
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="Reference" value={form.reference} onChange={e=>setForm({...form,reference:e.target.value})} />
        <button>Record Payment</button>
      </form>

      <table className="table">
        <thead><tr><th>Lease</th><th>Amount</th><th>Paid At</th><th>Method</th><th>Ref</th></tr></thead>
        <tbody>
          {items.map(p=>(
            <tr key={p._id}>
              <td>{p.lease}</td>
              <td>₹ {p.amount}</td>
              <td>{new Date(p.paidAt).toLocaleString()}</td>
              <td>{p.method}</td>
              <td>{p.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
