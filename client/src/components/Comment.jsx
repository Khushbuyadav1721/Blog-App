import { Button } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike, onEdit, onDelete}) {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const isLiked = currentUser && comment.likes?.includes(currentUser._id);
  const likeCount = comment.numberOfLikes || 0;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = () => {
    if (editedContent.trim() === "") return;
    onEdit(comment, editedContent);
    setIsEditing(false);
  };

  const canEdit =
    currentUser &&
    (currentUser._id === comment.userId ||
      currentUser._id === comment.user?._id ||
      currentUser.isAdmin);

  return (
    <div className="flex gap-3 mb-4">
      <div>
        <img
          className="w-10 h-10 rounded-full bg-gray-200 object-cover"
          src={comment.user.profilePicture}
          alt={comment.user.username || "User"}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs truncate">
            @{comment.user.username || "anonymous"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <textarea
              className="w-full p-2 text-gray-700 bg-gray-100 rounded-md resize-none border mt-2"
              rows="3"
              name="edit-comment"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs mt-2">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 pb-2 mt-1">{comment.content}</p>
        )}

        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-sm ${
              isLiked ? "text-blue-500" : "text-gray-400"
            } hover:text-blue-600`}
          >
            <FaThumbsUp />
          </button>
          <span className="text-xs text-gray-500 ml-1">
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>

          {canEdit && !isEditing && (
            <>
            <button
              type="button"
              onClick={handleEdit}
              className="text-gray-400 hover:text-red-500"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(comment._id)}
              className="text-gray-400 hover:text-red-500"
            >
              Delete
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
