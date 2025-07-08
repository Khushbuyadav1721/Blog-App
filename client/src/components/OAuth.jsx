import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../assets/redux/user/userSlice';
import { useNavigate } from 'react-router-dom'; 

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const adminEmails = ['khushbu@gmail.com', 'admin@example.com']; // ✅ Add admin emails here

      dispatch(signInSuccess({
        username: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        uid: user.uid,
        isAdmin: adminEmails.includes(user.email), // ✅ true if email is admin
      }));

      localStorage.setItem("currentUser", JSON.stringify(user)); // Optional for debugging
      navigate('/'); 
    } catch (error) {
      console.log("Google login failed:", error.message);
    }
  };

  return (
    <Button type='button' gradientDuoTone='pinkToPurple' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
}
