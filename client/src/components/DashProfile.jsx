import { TextInput, Button, Alert, Modal } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess
} from '../assets/redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

export default function DashProfile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
        profilePicture: currentUser.profilePicture || '',
      });
      setImageFileUrl(currentUser.profilePicture || '');
    }
  }, [currentUser]);

  useEffect(() => {
    if (imageFile) uploadImage();
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setUploadComplete(false);
    }
  };

  const uploadImage = () => {
    setUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      () => {
        setUploadError('Upload failed. Try a smaller image.');
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData((prev) => ({ ...prev, profilePicture: url }));
          setImageFileUrl(url);
          setUploadComplete(true);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!uploadComplete && imageFile) {
      setSubmitError('Wait for image to finish uploading.');
      return;
    }

    const hasChanges =
      formData.username !== currentUser.username ||
      formData.email !== currentUser.email ||
      formData.password !== '' ||
      formData.profilePicture !== currentUser.profilePicture;

    if (!hasChanges) {
      setSubmitError('No changes detected.');
      return;
    }

    dispatch(updateStart());

    try {
      const updatedUser = {
        ...currentUser, // ✅ preserve isAdmin flag
        username: formData.username,
        email: formData.email,
        profilePicture: formData.profilePicture,
      };

      dispatch(updateSuccess(updatedUser));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // ✅ persist isAdmin
      setSubmitSuccess('Profile updated successfully.');
    } catch (err) {
      dispatch(updateFailure('Update failed.'));
      setSubmitError('Something went wrong.');
    }
  };

  const handleDeleteUser = () => {
    setShowModal(false);
    dispatch(deleteUserStart());
    dispatch(deleteUserSuccess());
    dispatch(signoutSuccess());
    localStorage.removeItem('currentUser');
    window.location.href = '/sign-in';
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    localStorage.removeItem('currentUser');
    window.location.href = '/sign-in';
  };

  if (!currentUser) {
    return <p className="text-center text-gray-500 mt-10">Please sign in to view your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" ref={filePickerRef} onChange={handleImageChange} hidden />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || '/profile.png'}
            alt="Profile"
            className={`w-full h-full rounded-full border-8 border-[lightgray] shadow-lg object-cover ${
              uploadProgress > 0 && uploadProgress < 100 ? 'opacity-60' : ''
            }`}
          />
        </div>

        {uploadError && <p className="text-red-500 text-sm text-center">{uploadError}</p>}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-blue-500 text-sm text-center">Uploading: {uploadProgress}%</p>
        )}
        {uploadProgress === '100' && (
          <p className="text-green-500 text-sm text-center">Upload complete</p>
        )}

        <TextInput type="text" id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <TextInput type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="Password (optional)" value={formData.password} onChange={handleChange} />

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || (uploadProgress > 0 && uploadProgress < 100)}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>

        {/* ✅ Show Create Post button only if isAdmin is true */}
        {currentUser?.isAdmin && (
          <Link to="/create-post">
            <Button type="button" gradientDuoTone="purpleToPink" className="w-full">
              Create a Post
            </Button>
          </Link>
        )}
      </form>

      {submitError && <Alert color="failure" className="mt-5">{submitError}</Alert>}
      {submitSuccess && <Alert color="success" className="mt-5">{submitSuccess}</Alert>}

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
