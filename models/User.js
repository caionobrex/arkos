import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: String,
  salt: String,
  phone: {
    ddd: { type: String, required: true },
    number: { type: String, required: true }
  }
}, { timestamps: true })

userSchema.methods.setPass = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, 'sha512').toString('hex')
}

userSchema.methods.checkPass = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

export default mongoose.models.User || mongoose.model('User', userSchema, 'users2')