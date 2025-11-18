import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { blogsAPI, commentsAPI, likesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Comment from '../components/Comment';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBlog();
    loadComments();
  }, [id]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const data = await blogsAPI.getById(id);
      setBlog(data);
      setError('');
    } catch (err) {
      setError('Failed to load blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await commentsAPI.getByBlogId(id);
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const result = await likesAPI.toggle(id);
      setLiked(result.liked);
      loadBlog(); // Reload to get updated likes count
    } catch (err) {
      console.error('Failed to like blog', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const comment = await commentsAPI.create(id, newComment);
      setComments([comment, ...comments]); // Add new comment at the beginning
      setNewComment('');
      loadBlog(); // Reload to get updated comments count
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogsAPI.delete(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete blog');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Blog not found'}
        </div>
      </div>
    );
  }

  const isOwner = isAuthenticated && user?.id === blog.author?.id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By {blog.author?.name || 'Unknown'}</span>
              <span>•</span>
              <span>{format(new Date(blog.created_at), 'MMM d, yyyy HH:mm')}</span>
            </div>
          </div>
          {isOwner && (
            <div className="flex space-x-2">
              <Link
                to={`/edit-blog/${id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
        </div>

        <div className="border-t pt-4 mb-8">
          <button
            onClick={handleLike}
            className={`px-4 py-2 rounded flex items-center space-x-2 ${
              liked
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>❤️</span>
            <span>{blog.likes_count || 0} Likes</span>
          </button>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Comments ({blog.comments_count || 0})</h2>
          
          {comments.length > 0 && (
            <div className="mb-6">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}

          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Login to add a comment
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

