import mongoose from 'mongoose';

const InboxSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
}, { timestamps: true });

InboxSchema.pre("save", function () {
  if (this.users && this.users.length > 1) {
    this.users.sort(); // sorts ObjectIds in ascending order
  }
});

InboxSchema.index({ users: 1 }, { unique: true });

export default mongoose.models.Inbox || mongoose.model('Inbox', InboxSchema);