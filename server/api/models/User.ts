import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  profiles: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
      },
      name: { type: String, required: true },
    },
  ],
})

module.exports = mongoose.model('User', userSchema)
