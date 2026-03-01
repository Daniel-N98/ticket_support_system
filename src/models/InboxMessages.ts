import mongoose from 'mongoose';

const InboxMessagesSchema = new mongoose.Schema({
  inboxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InboxMessage",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

export default mongoose.models.InboxMessages || mongoose.model('InboxMessages', InboxMessagesSchema);