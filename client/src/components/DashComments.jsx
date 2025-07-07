import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
// Comment this during testing if Redux is not set up
// import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

// ✅ TEMP ADMIN USER FOR TESTING (REMOVE THIS AFTER LOGIN IS IMPLEMENTED)
const currentUser = {
  isAdmin: true,
  username: 'TestAdmin',
};

export default function DashComments() {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  // ✅ Load mock data every time (for testing only)
  useEffect(() => {
    if (currentUser?.isAdmin) {
      const mockComments = [
        {
          _id: 'c1',
          createdAt: '2023-12-15T10:00:00.000Z',
          content: 'nice post',
          numberOfLikes: 0,
          postId: '6577c6d9f1825b1e34f0a001',
          userId: 'u123',
        },
        {
          _id: 'c2',
          createdAt: '2023-12-18T12:30:00.000Z',
          content: 'new comment',
          numberOfLikes: 1,
          postId: '6577c6d9f1825b1e34f0a001',
          userId: 'u456',
        },
      ];

      localStorage.setItem('mockComments', JSON.stringify(mockComments));
      setComments(mockComments);
      setShowMore(false); // disable show more
    }
  }, []);

  const handleShowMore = () => {
    const stored = JSON.parse(localStorage.getItem('mockComments')) || [];
    const nextSlice = stored.slice(0, comments.length + 9);
    setComments(nextSlice);
    if (nextSlice.length >= stored.length) setShowMore(false);
  };

  const handleDeleteComment = () => {
    setShowModal(false);
    const updated = comments.filter((c) => c._id !== commentIdToDelete);
    setComments(updated);
    localStorage.setItem('mockComments', JSON.stringify(updated));
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment) => (
                <Table.Row key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">You have no comments yet!</p>
      )}

      {/* Delete Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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
