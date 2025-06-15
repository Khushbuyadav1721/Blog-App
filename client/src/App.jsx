import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "./assets/redux/user/userSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInSuccess({
      username: "khushbu_yadav123",
      email: "khushbu@gmail.com",
      profilePicture: "/profile.png",
    }));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
