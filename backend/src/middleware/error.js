export const notFound = (req,res,next)=>{
  const err = new Error(`Not Found - ${req.originalUrl}`)
  err.status = 404
  next(err)
}

export const errorHandler = (err, req, res, next)=>{
  const status = err.status || 500
  const msg = err.message || 'Server Error'
  res.status(status).json({ message: msg, stack: process.env.NODE_ENV==='production' ? '🥞' : err.stack })
}
