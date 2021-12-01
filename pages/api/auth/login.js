import connectDB from '../../../middlewares/connectDB'
import User from '../../../models/User'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body
    const user = await User.findOne({ email: username }).select('+hash').select('+salt')
    if (!user || !user.checkPass(password)) return res.status(401).json({})
    res.status(200).json(user)
  }
}

export default connectDB(handler)