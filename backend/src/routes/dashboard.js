import express from 'express'
import { protect } from '../middleware/auth.js'
import Payment from '../models/Payment.js'
import Lease from '../models/Lease.js'
import Property from '../models/Property.js'
const router = express.Router()
router.use(protect)

router.get('/stats', async (req,res)=>{
  const [properties, leases, payments] = await Promise.all([
    Property.countDocuments({ owner:req.user._id }),
    Lease.countDocuments({ owner:req.user._id, status:'active' }),
    Payment.aggregate([
      { $match: { owner: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])
  ])
  const totalIncome = payments[0]?.total || 0
  res.json({ properties, activeLeases: leases, totalIncome })
})

export default router
