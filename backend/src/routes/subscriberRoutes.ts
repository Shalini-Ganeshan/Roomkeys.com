import Subscriber from '../models/subscriber'; 
import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async  (req: Request, res: Response) => {
  const { email } = req.body;

  try {

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      
      return res.status(400).json({ message: 'You are already a subscriber!' });
    }

 
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();


    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
   
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
router.get('/', async (req, res) => {
  try {
  
    const subscribers = await Subscriber.find({}, 'email');
    res.status(200).json(subscribers); 
  } catch (error) {
    
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
