import { Button } from 'flowbite-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../assets/redux/user/userSlice';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        username: user.displayName,
        email: user.email,
        profilePicture: user.photoURL || '/profile.png',
        isAdmin: user.email === 'khushbuyadav2529@gmail.com',
      };

      dispatch(signInSuccess(userData));
      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure('Google sign-in failed.'));
    }
  };

  return (
    <Button type='button' onClick={handleGoogleClick} color='gray'>
      Continue with Google
    </Button>
  );
}
