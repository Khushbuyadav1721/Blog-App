import { useState } from 'react';
import { TextInput, Button, Alert } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../assets/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // ✅ Simulated Admin Logic
    const isAdmin = email === 'khushbu@gmail.com'; // Make this your admin email

    const user = {
      username: email.split('@')[0],
      email,
      profilePicture: '/profile.png',
      isAdmin, // ✅
};


    dispatch(signInSuccess(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Sign In
        </Button>
      </form>

      {error && (
        <Alert color="failure" className="mt-4">
          {error}
        </Alert>
      )}
    </div>
  );
}
