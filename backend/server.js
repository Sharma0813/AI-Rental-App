import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import './src/utils/asyncErrors.js'
import authRoutes from './src/routes/auth.js'
import propertyRoutes from './src/routes/property.js'
import tenantRoutes from './src/routes/tenant.js'
import leaseRoutes from './src/routes/lease.js'
import paymentRoutes from './src/routes/payment.js'
import maintenanceRoutes from './src/routes/maintenance.js'
import dashboardRoutes from './src/routes/dashboard.js'
import { notFound, errorHandler } from './src/middleware/error.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res)=>res.json({status:'ok', service:'rental-manager-api'}))

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/tenants', tenantRoutes)
app.use('/api/leases', leaseRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/maintenance', maintenanceRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rental_manager'

mongoose.connect(MONGO_URI).then(()=>{
  app.listen(PORT, ()=>console.log(`API running on http://localhost:${PORT}`))
}).catch(err=>{
  console.error('Mongo connection error:', err.message)
  process.exit(1)
})
