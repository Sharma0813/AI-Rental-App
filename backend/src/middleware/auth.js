import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req,res,next)=>{
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null
  if(!token) return res.status(401).json({ message:'No token'})
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(payload.id).select('-password')
    if(!req.user) return res.status(401).json({ message:'User not found'})
    next()
  }catch(e){
    return res.status(401).json({ message:'Invalid token'})
  }
}
