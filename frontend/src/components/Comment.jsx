import { format } from 'date-fns';

const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">{comment.user?.name || 'Unknown'}</span>
        <span className="text-sm text-gray-500">
          {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
        </span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  );
};

export default Comment;

