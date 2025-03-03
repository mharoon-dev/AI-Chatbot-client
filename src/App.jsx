import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat/Chat.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
