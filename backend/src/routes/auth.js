import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const router = express.Router()

const sign = (id)=> jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body
  if(!name || !email || !password) return res.status(400).json({ message:'Missing fields'})
  const exists = await User.findOne({ email })
  if(exists) return res.status(400).json({ message:'Email in use'})
  const user = await User.create({ name, email, password })
  res.json({ user:{ id:user._id, name:user.name, email:user.email }, token: sign(user._id) })
})

router.post('/login', async (req,res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user || !(await user.matchPassword(password))) return res.status(401).json({ message:'Invalid credentials'})
  res.json({ user:{ id:user._id, name:user.name, email:user.email }, token: sign(user._id) })
})

export default router
