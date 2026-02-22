import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
