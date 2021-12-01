import connectDB from '../../../middlewares/connectDB'
import User from '../../../models/User'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, pass, confirmPass } = req.body
    let user = await User.findOne({ $or: [ { email }, { name } ] })
    if (user) return res.status(401).json({ msg: 'Usuario já cadastrado.' })
    user = new User({ name, email, phone: { ddd: '85', number: '123456789' } })
    user.setPass(pass)
    await user.save()
    res.json(user)
  }
}

export default connectDB(handler)