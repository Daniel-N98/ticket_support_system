import mongoose from 'mongoose';

const InboxSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    validate: {
      validator: function (v: mongoose.Schema.Types.ObjectId[]) {
        return v.length === 2;
      },
      message: "An inbox must have exactly 2 users."
    }
  },
}, { timestamps: true });

InboxSchema.pre("validate", function () {
  if (this.users && this.users.length === 2) {
    this.users.sort((a, b) => a.toString().localeCompare(b.toString()));
  }
});

InboxSchema.index({ "users.0": 1, "users.1": 1 }, { unique: true });

export default mongoose.models.Inbox || mongoose.model('Inbox', InboxSchema);