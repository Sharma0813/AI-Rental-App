import express from 'express'
import { protect } from '../middleware/auth.js'
import Property from '../models/Property.js'
const router = express.Router()

router.use(protect)

router.get('/', async (req,res)=>{
  const list = await Property.find({ owner: req.user._id }).sort({ createdAt:-1 })
  res.json(list)
})

router.post('/', async (req,res)=>{
  const doc = await Property.create({ ...req.body, owner: req.user._id })
  res.status(201).json(doc)
})

router.get('/:id', async (req,res)=>{
  const doc = await Property.findOne({ _id:req.params.id, owner:req.user._id })
  if(!doc) return res.status(404).json({ message:'Not found'})
  res.json(doc)
})

router.put('/:id', async (req,res)=>{
  const doc = await Property.findOneAndUpdate(
    { _id:req.params.id, owner:req.user._id },
    req.body,
    { new:true }
  )
  if(!doc) return res.status(404).json({ message:'Not found'})
  res.json(doc)
})

router.delete('/:id', async (req,res)=>{
  const doc = await Property.findOneAndDelete({ _id:req.params.id, owner:req.user._id })
  if(!doc) return res.status(404).json({ message:'Not found'})
  res.json({ message:'Deleted'})
})

export default router
