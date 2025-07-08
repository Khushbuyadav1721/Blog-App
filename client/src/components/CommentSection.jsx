import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Textarea, Modal } from "flowbite-react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("mockComments");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "" || comment.length > 200) return;

    const newComment = {
      _id: Date.now().toString(),
      content: comment,
      createdAt: new Date().toISOString(),
      userId: currentUser._id,
      user: {
        username: currentUser.username,
        profilePicture: currentUser.profilePicture,
      },
      likes: [],
      numberOfLikes: 0,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("mockComments", JSON.stringify(updated));
    setComment("");
  };

  const handleLike = (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        const alreadyLiked = comment.likes?.includes(currentUser._id);
        const newLikes = alreadyLiked
          ? comment.likes.filter((id) => id !== currentUser._id)
          : [...(comment.likes || []), currentUser._id];

        return {
          ...comment,
          likes: newLikes,
          numberOfLikes: newLikes.length,
        };
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem("mockComments", JSON.stringify(updatedComments));
  };

  const handleEdit = (comment, editedContent) => {
    const updatedComments = comments.map((c) =>
      c._id === comment._id ? { ...c, content: editedContent } : c
    );
    setComments(updatedComments);
    localStorage.setItem("mockComments", JSON.stringify(updatedComments));
  };

  const handleDelete = () => {
    const updatedComments = comments.filter(
      (c) => c._id !== commentToDelete
    );
    setComments(updatedComments);
    localStorage.setItem("mockComments", JSON.stringify(updatedComments));
    setShowModal(false);
    setCommentToDelete(null);
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <>
          <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xs text-cyan-600 font-medium">
              @{currentUser.username}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-teal-500 rounded-md p-3"
          >
            <Textarea
              placeholder="Add a comment..."
              rows="3"
              maxLength="200"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500 text-xs">
                {200 - comment.length} characters remaining
              </p>
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                type="submit"
                disabled={comment.trim() === "" || comment.length > 200}
              >
                Submit
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">
              Comments ({comments.length})
            </p>
            {comments.map((c) => (
              <Comment
                key={c._id}
                comment={c}
                onLike={() => handleLike(c._id)}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-teal-500 my-5">
          You must be signed in to comment.
        </p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
