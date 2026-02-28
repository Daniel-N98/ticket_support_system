import mongoose from 'mongoose';

const TicketsSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
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
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Closed", "Pending"],
    default: "Open",
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Low",
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
    this.ticketId = `${String(count + 1).padStart(3, '0')}`;
  }
});

export default mongoose.models.Tickets || mongoose.model('Tickets', TicketsSchema);