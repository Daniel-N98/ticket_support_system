import mongoose from 'mongoose';

const TicketReplySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tickets",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

TicketReplySchema.index({ ticketId: 1, createdAt: 1 });

export default mongoose.models.TicketReply || mongoose.model('TicketReply', TicketReplySchema);