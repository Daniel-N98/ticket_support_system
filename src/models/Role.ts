import mongoose from 'mongoose';

const RolesSchema = new mongoose.Schema({
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
  permissions: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Roles || mongoose.model('Roles', RolesSchema);