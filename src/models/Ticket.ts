import mongoose from 'mongoose';

const TicketsSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "pending"],
    default: "open",
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "low",
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
}, { timestamps: true });

TicketsSchema.pre('save', async function () {
  if (!this.ticketId) {
    const count = await mongoose.model('Tickets').countDocuments();
    this.ticketId = `#${String(count + 1).padStart(3, '0')}`;
  }
});

export default mongoose.models.Tickets || mongoose.model('Tickets', TicketsSchema);