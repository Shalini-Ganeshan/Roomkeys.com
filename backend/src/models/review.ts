import mongoose, { Schema, Document } from 'mongoose';


interface IReview extends Document {
  text: string;
  commenter: string;
  profilePic?: string; 
  timestamp: Date;
  hotelId: mongoose.Types.ObjectId; 
  userId: mongoose.Types.ObjectId;
}


const ReviewSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500, 
  },
  commenter: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Hotel', 
  },
  userId: {
    type: mongoose.Types.ObjectId, 
    required: true,
    ref: 'User', 
  },
});


const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
