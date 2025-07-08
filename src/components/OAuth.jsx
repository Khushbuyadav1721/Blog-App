import { Button } from 'flowbite-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../assets/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        username: result.user.displayName,
        email: result.user.email,
        profilePicture: result.user.photoURL || '/profile.png',
        isAdmin: result.user.email === 'khushbuyadav2529@gmail.com',
      };

      dispatch(signInSuccess(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.log('Google sign-in error', error);
    }
  };

  return (
    <Button onClick={handleGoogleClick} type='button' color='gray'>
      Continue with Google
    </Button>
  );
}
