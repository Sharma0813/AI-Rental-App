import mongoose from 'mongoose'

const leaseSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rent: { type: Number, required: true },
  deposit: { type: Number, default: 0 },
  status: { type: String, enum: ['active','ended','pending'], default: 'active' }
}, { timestamps: true })

export default mongoose.model('Lease', leaseSchema)
