import express from 'express'
import { protect } from '../middleware/auth.js'
import Maintenance from '../models/Maintenance.js'
const router = express.Router()
router.use(protect)

router.get('/', async (req,res)=>{
  res.json(await Maintenance.find({ owner:req.user._id }).sort({createdAt:-1}))
})

router.post('/', async (req,res)=>{
  res.status(201).json(await Maintenance.create({ ...req.body, owner:req.user._id }))
})

router.put('/:id', async (req,res)=>{
  const doc = await Maintenance.findOneAndUpdate({ _id:req.params.id, owner:req.user._id }, req.body, { new:true })
  if(!doc) return res.status(404).json({ message:'Not found' })
  res.json(doc)
})

export default router
