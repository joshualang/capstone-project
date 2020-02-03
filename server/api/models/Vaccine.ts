import mongoose from 'mongoose'

const vaccineSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  admittedApplicant: { type: String, required: true },
  description: { type: String, required: true },
  diseases: [{ type: String, required: true }],
  furtherInformation: { type: String, required: true },
  name: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  registrationNumber: { type: String, required: true },
})

module.exports = mongoose.model('Vaccine', vaccineSchema)
