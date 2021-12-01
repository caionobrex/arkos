import mongoose from 'mongoose'

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState)
    return handler ? handler(req, res) : null

  try {
    await mongoose.connect(process.env.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) { console.error(err) }

  return handler ? handler(req, res) : null
}

export default connectDB