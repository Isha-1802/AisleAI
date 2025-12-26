import { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewSection.css';

const API_URL = 'http://localhost:5001/api'; // Temporarily force local URL for testing
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function ReviewSection({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Editing state
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // Check currentUser
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API_URL}/reviews/${productId}`);
            setReviews(res.data.reviews);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to write a review');
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': token } }; // Bearer token usually

            if (editingId) {
                // Update
                const res = await axios.put(`${API_URL}/reviews/${editingId}`, { rating, comment }, config);
                setReviews(reviews.map(r => r._id === editingId ? { ...r, ...res.data.review, user: r.user } : r));
                setEditingId(null);
            } else {
                // Create
                const res = await axios.post(`${API_URL}/reviews`, { productId, rating, comment }, config);
                setReviews([res.data.review, ...reviews]);
            }

            // Reset form
            setRating(5);
            setComment('');
        } catch (err) {
            console.error('Submit review error:', err);
            const errMsg = err.response?.data?.error || err.message || 'Failed to submit review';
            alert(`Error (${err.response?.status}): ${errMsg}`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (review) => {
        setEditingId(review._id);
        setRating(review.rating);
        setComment(review.comment);
        // Scroll to form
        document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/reviews/${reviewId}`, {
                headers: { 'Authorization': token }
            });
            setReviews(reviews.filter(r => r._id !== reviewId));
        } catch (err) {
            alert('Failed to delete review');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setRating(5);
        setComment('');
    };

    return (
        <div className="review-section">
            <h3 className="section-title">Customer Reviews ({reviews.length})</h3>

            {/* Review Form */}
            <div id="review-form" className="review-form-container">
                <h4>{editingId ? 'Edit Your Review' : 'Write a Review'}</h4>
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <div className="rating-input">
                            <label>Rating:</label>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{ color: star <= rating ? '#FFD700' : '#ddd', cursor: 'pointer', fontSize: '1.5rem' }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            required
                            rows="4"
                        />
                        <div className="form-actions">
                            <button type="submit" disabled={submitting}>
                                {submitting ? 'Submitting...' : (editingId ? 'Update Review' : 'Submit Review')}
                            </button>
                            {editingId && (
                                <button type="button" onClick={cancelEdit} className="cancel-btn">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    <p className="login-prompt">Please <a href="/login">login</a> to write a review.</p>
                )}
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
                {loading ? <p>Loading reviews...</p> : (
                    reviews.length === 0 ? <p className="no-reviews">No reviews yet. Be the first!</p> : (
                        reviews.map(review => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="review-comment">{review.comment}</p>

                                {user && user._id === review.user?._id && (
                                    <div className="review-actions">
                                        <button onClick={() => handleEdit(review)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(review._id)} className="delete-btn">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
}

export default ReviewSection;
