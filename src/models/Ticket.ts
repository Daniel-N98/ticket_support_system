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
    default: "Pending",
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
    const Tickets = mongoose.model('Tickets');

    const lastTicket = await Tickets.findOne({})
      .sort({ ticketId: -1 })
      .select('ticketId')
      .lean<{ ticketId: string }>();

    let nextId = 1;
    if (lastTicket?.ticketId) {
      nextId = parseInt(lastTicket.ticketId, 10) + 1;
    }

    this.ticketId = String(nextId).padStart(3, '0');
  }
});

export default mongoose.models.Tickets || mongoose.model('Tickets', TicketsSchema);