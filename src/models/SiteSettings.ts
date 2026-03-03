import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);