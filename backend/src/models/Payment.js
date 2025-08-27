import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lease: { type: mongoose.Schema.Types.ObjectId, ref: 'Lease', required: true },
  amount: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
  method: { type: String, enum: ['cash','bank','upi','card','other'], default:'bank' },
  reference: String,
  notes: String
}, { timestamps: true })

export default mongoose.model('Payment', paymentSchema)
