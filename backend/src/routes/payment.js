import express from 'express'
import { protect } from '../middleware/auth.js'
import Payment from '../models/Payment.js'
const router = express.Router()
router.use(protect)

router.get('/', async (req,res)=>{
  res.json(await Payment.find({ owner:req.user._id }).populate('lease').sort({createdAt:-1}))
})

router.post('/', async (req,res)=>{
  res.status(201).json(await Payment.create({ ...req.body, owner:req.user._id }))
})

export default router
