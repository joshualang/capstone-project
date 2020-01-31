import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema(
  {
    Masern: { type: Boolean, required: true, default: true },
    Rotaviren: { type: Boolean, required: true, default: true },
    Mumps: { type: Boolean, required: true, default: true },
    HerpesZoster: { type: Boolean, required: true, default: true },
    Influenza: { type: Boolean, required: true, default: true },
    Pneumokokken: { type: Boolean, required: true, default: true },
    HPV: { type: Boolean, required: true, default: true },
    Hib: { type: Boolean, required: true, default: true },
    Pertussis: { type: Boolean, required: true, default: true },
    Tetanus: { type: Boolean, required: true, default: true },
    Polio: { type: Boolean, required: true, default: true },
    Diphtherie: { type: Boolean, required: true, default: true },
    MeningokokkenC: { type: Boolean, required: true, default: true },
    HepatitisB: { type: Boolean, required: true, default: true },
    Varizellen: { type: Boolean, required: true, default: true },
  },
  { _id: false }
)

module.exports = settingsSchema
