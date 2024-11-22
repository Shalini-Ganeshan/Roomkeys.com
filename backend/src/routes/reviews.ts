import express, { Request, Response } from 'express';
import Review from '../models/review';

const router = express.Router();


router.get('/:hotelId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ hotelId: req.params.hotelId }).sort({ timestamp: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { text, commenter, profilePic, hotelId, userId } = req.body;

  if (!text || !commenter || !hotelId || !userId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const newReview = new Review({
    text,
    commenter,
    profilePic: profilePic || null,
    hotelId,
    userId, 
  });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error saving review', error });
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const { text } = req.body; 

  try {
 
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).send('Review not found.');
    }


    review.text = text;
    review.timestamp = new Date();

 
    await review.save();
    res.send('Review updated successfully.');
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  try {

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).send('Review not found.');
    }


    await Review.findByIdAndDelete(reviewId);
    res.send('Review deleted successfully.');
  } catch (error) {
   
    res.status(500).send('Server error.');
  }
});

export default router;
