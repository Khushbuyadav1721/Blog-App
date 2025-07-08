import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    if (!storedUsers || storedUsers.length === 0) {
      const dummyUsers = [
        {
          _id: '1',
          username: 'adminuser',
          email: 'adminuser@gmail.com',
          isAdmin: true,
          profilePicture: '',
          createdAt: '2023-12-11',
        },
        {
          _id: '2',
          username: 'khushbu yadav',
          email: 'khushbuyadav2529@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2023-12-11',
        },
        {
          _id: '3',
          username: 'user6',
          email: 'user6@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2023-12-10',
        },
        {
          _id: '4',
          username: 'user5',
          email: 'user5@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2024-12-04',
        },
        {
          _id: '5',
          username: 'user4',
          email: 'user4@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2024-12-04',
        },
        {
          _id: '6',
          username: 'user3',
          email: 'user3@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2023-12-04',
        },
        {
          _id: '7',
          username: 'user2',
          email: 'user2@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2023-12-03',
        },
        {
          _id: '8',
          username: 'user1',
          email: 'user1@gmail.com',
          isAdmin: false,
          profilePicture: '',
          createdAt: '2023-12-03',
        },
      ];

      localStorage.setItem('users', JSON.stringify(dummyUsers));
      setAllUsers(dummyUsers);
      setVisibleUsers(dummyUsers.slice(0, 7));
      setShowMore(dummyUsers.length > 7);
    } else {
      setAllUsers(storedUsers);
      setVisibleUsers(storedUsers.slice(0, 7));
      setShowMore(storedUsers.length > 7);
    }
  }, []);

  const handleDeleteUser = () => {
    const updated = allUsers.filter((user) => user._id !== userIdToDelete);
    localStorage.setItem('users', JSON.stringify(updated));
    setAllUsers(updated);
    setVisibleUsers(updated.slice(0, 7));
    setShowMore(updated.length > 7);
    setShowModal(false);
  };

  const handleShowMore = () => {
    setVisibleUsers(allUsers);
    setShowMore(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {currentUser?.isAdmin && visibleUsers.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table hoverable className="w-full text-sm shadow-md">
              <Table.Head>
                <Table.HeadCell className="min-w-[140px]">Date Created</Table.HeadCell>
                <Table.HeadCell className="min-w-[100px]">User Image</Table.HeadCell>
                <Table.HeadCell className="min-w-[150px]">Username</Table.HeadCell>
                <Table.HeadCell className="min-w-[150px]">Email</Table.HeadCell>
                <Table.HeadCell className="min-w-[100px]">Admin</Table.HeadCell>
                <Table.HeadCell className="min-w-[100px]">Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {visibleUsers.map((user) => (
                  <Table.Row key={user._id} className="bg-white dark:bg-gray-800">
                    <Table.Cell>{user.createdAt || new Date().toISOString().split('T')[0]}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={
                          user.profilePicture ||
                          'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'
                        }
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-gray-900 dark:text-white">{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="text-red-500 cursor-pointer hover:underline"
                        onClick={() => {
                          setUserIdToDelete(user._id);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {showMore && (
            <div className="flex justify-center mt-4">
              <Button size="sm" outline onClick={handleShowMore}>
                Show More
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">No users found.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
