import mongoose from 'mongoose'

const tenantSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  emergencyContact: { name: String, phone: String }
}, { timestamps: true })

export default mongoose.model('Tenant', tenantSchema)
