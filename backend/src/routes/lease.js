import express from 'express'
import { protect } from '../middleware/auth.js'
import Lease from '../models/Lease.js'
const router = express.Router()
router.use(protect)

router.get('/', async (req,res)=>{
  res.json(await Lease.find({ owner:req.user._id }).populate('tenant property').sort({createdAt:-1}))
})

router.post('/', async (req,res)=>{
  res.status(201).json(await Lease.create({ ...req.body, owner:req.user._id }))
})

router.put('/:id', async (req,res)=>{
  const doc = await Lease.findOneAndUpdate({ _id:req.params.id, owner:req.user._id }, req.body, { new:true })
  if(!doc) return res.status(404).json({ message:'Not found' })
  res.json(doc)
})

router.delete('/:id', async (req,res)=>{
  const doc = await Lease.findOneAndDelete({ _id:req.params.id, owner:req.user._id })
  if(!doc) return res.status(404).json({ message:'Not found' })
  res.json({ message:'Deleted' })
})

export default router
