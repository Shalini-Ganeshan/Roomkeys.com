import mongoose, { Schema, Document } from 'mongoose';

interface ISubscriber extends Document {
  email: string;
}

const SubscriberSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});


const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
