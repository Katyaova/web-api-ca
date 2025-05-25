import mongoose from 'mongoose';

const userListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorites: [Number],
  mustWatch: [Number],
});

export default mongoose.model('UserList', userListSchema);
