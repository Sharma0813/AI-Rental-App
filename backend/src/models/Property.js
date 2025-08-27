import mongoose from 'mongoose'

const unitSchema = new mongoose.Schema({
  name: String,
  bedrooms: Number,
  bathrooms: Number,
  sizeSqft: Number,
  rent: Number,
  status: { type: String, enum: ['vacant','occupied','maintenance'], default: 'vacant' }
}, { _id: true })

const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['apartment','house','condo','duplex','commercial'], default:'apartment' },
  address: { line1: String, line2: String, city: String, state: String, zip: String, country: String },
  units: [unitSchema],
  notes: String
}, { timestamps: true })

export default mongoose.model('Property', propertySchema)
