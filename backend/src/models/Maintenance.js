import mongoose from 'mongoose'

const maintenanceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['open','in-progress','closed'], default: 'open' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' }
}, { timestamps: true })

export default mongoose.model('Maintenance', maintenanceSchema)
