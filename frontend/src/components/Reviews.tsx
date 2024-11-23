import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

interface User {
  _id: string;
  email: string;
  profilePic: string | null;
  token: string;
}

interface Review {
  _id: string;
  text: string;
  commenter: string;
  timestamp: string;
  userId: string;
  profilePic: string | null;
}

interface ReviewsProps {
  hotelId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ hotelId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  
  const { isLoggedIn, currentUser } = useAppContext() as { 
    isLoggedIn: boolean; 
    currentUser: User | undefined; 
  };
  
  const [newReview, setNewReview] = useState<string>('');
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [editedReviewText, setEditedReviewText] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, [hotelId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>(`https://roomkeys-backend.onrender.com/api/reviews/${hotelId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (isLoggedIn && currentUser) {
      const reviewData = {
        text: newReview,
        commenter: currentUser.email || 'Anonymous',
        profilePic: currentUser.profilePic || null,
        hotelId,
        userId: currentUser._id,
      };

      try {
        await axios.post('https://roomkeys-backend.onrender.com/api/reviews', reviewData);
        setNewReview('');
        fetchReviews();
      } catch (error) {
        alert('Error submitting review. Please try again.');
        console.error('Error submitting review:', error);
      }
    } else {
      navigate('/sign-in');
    }
  };

  const handleEditReview = async (id: string) => {
    try {
      await axios.put(`https://roomkeys-backend.onrender.com/api/reviews/${id}`, { text: editedReviewText });
      setEditReviewId(null);
      setEditedReviewText('');
      fetchReviews();
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (currentUser?.token) {
      try {
        await axios.delete(`https://roomkeys-backend.onrender.com/api/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center">Reviews</h2>

      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a review..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex justify-center items-center">
        <button
          onClick={handleSubmitReview}
          className="bg-indigo-600 text-white p-2 lg:text-md text-sm rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border rounded-lg bg-gray-100 flex flex-col sm:flex-row justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center">
                <p className="font-semibold text-sm lg:text-md">{review.commenter}</p>
              </div>

              {editReviewId === review._id ? (
                <>
                  <textarea
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleEditReview(review._id)}
                    className="mt-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    Update Review
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-2 text-sm lg:text-base">{review.text}</p>
                  <p className="text-xs text-gray-500">{timeAgo(review.timestamp)}</p>
                </>
              )}
            </div>

            {review.userId === currentUser?._id && !editReviewId && (
              <div className="flex flex-row gap-3 lg:ml-4 mt-2 sm:mt-0">
                <button
                  onClick={() => {
                    setEditReviewId(review._id);
                    setEditedReviewText(review.text);
                  }}
                  className="text-indigo-600 text-xs hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
