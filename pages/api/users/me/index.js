import connectDB from '../../../../middlewares/connectDB'
import User from '../../../../models/User'
import { getSession } from 'next-auth/client'

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ msg: 'Auth required' })
  if (req.method === 'GET') {
    const user = await User.findOne({ _id: session.user.id })
    res.json(user)
  } else if (req.method === 'PUT') {
    let user = await User.findOne({ email: req.body.newEmail })
    if (user) return res.status(409).json({ msg: 'Email not available' })
    user = await User.findOneAndUpdate(
      { _id: session.user.id },
      { name: req.body.name, email: req.body.newEmail },
      { new: true }
    )
    res.status(200).json(user)
  }
}

export default connectDB(handler)