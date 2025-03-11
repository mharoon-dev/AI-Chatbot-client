import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat/Chat.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Login from "./Pages/Login/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./utils/url.js";
import { useEffect } from "react";
import { loginSuccess } from "./redux/slices/user.jsx";
import { setChatHistory } from "./redux/slices/chat.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const res = await api.get("api/auth/isuserloggedin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        dispatch(loginSuccess(res?.data?.data));

        // fetch the chat history
        const chatRes = await api.get(`/api/chat/user-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(chatRes);
        dispatch(setChatHistory(chatRes?.data?.data));
      }
    };
    checkUser();
  }, []);
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user?.loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
