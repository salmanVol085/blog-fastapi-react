import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition">
      <Link to={`/blog/${blog.id}`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
          {blog.title}
        </h2>
      </Link>
      
      <div className="text-gray-600 mb-3 line-clamp-3">
        {blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>By {blog.author?.name || 'Unknown'}</span>
          <span>•</span>
          <span>{format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span>❤️ {blog.likes_count || 0}</span>
          <span>💬 {blog.comments_count || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

