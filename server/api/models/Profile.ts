import mongoose from 'mongoose'
const settingsSchema = require('./Schema/Settings')

const profileSchema = new mongoose.Schema({
  birth: { type: Date, required: true },
  name: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  settings: { type: settingsSchema, required: true, default: {} },
  vaccinationsMade: [
    {
      date: Date,
      vaccineId: String,
      disease: String,
      doctor: String,
      _id: mongoose.Schema.Types.ObjectId,
      vaccinationType: String,
    },
  ],
})

module.exports = mongoose.model('Profile', profileSchema)
