import mongoose from 'mongoose';

const InboxMessageSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.InboxMessage || mongoose.model('InboxMessage', InboxMessageSchema);