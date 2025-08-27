import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard(){
  const [stats,setStats] = useState(null)
  useEffect(()=>{ (async()=>{
    const { data } = await api.get('/dashboard/stats')
    setStats(data)
  })() },[])
  if(!stats) return <div>Loading...</div>
  return (
    <div className="grid">
      <div className="card"><h3>Properties</h3><p>{stats.properties}</p></div>
      <div className="card"><h3>Active Leases</h3><p>{stats.activeLeases}</p></div>
      <div className="card"><h3>Total Income</h3><p>₹ {stats.totalIncome}</p></div>
    </div>
  )
}
