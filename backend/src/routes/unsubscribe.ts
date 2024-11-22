import Subscriber from '../models/subscriber'; 
import express, { Request, Response } from 'express';

const router = express.Router();

router.delete('/', async (req: Request, res: Response)  => {
  const { email } = req.body; 

  try {
    
    const result = await Subscriber.findOneAndDelete({ email });

    if (result) {
      
      res.status(200).json({ message: 'Unsubscribed successfully.' });
    } else {
     
      res.status(404).json({ message: 'Email not found in subscribers.' });
    }
  } catch (error) {
  
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
