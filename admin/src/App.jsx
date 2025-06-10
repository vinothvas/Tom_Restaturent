import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood";
import ListFood from "./pages/ListFood";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : '');

  useEffect(() => {
   localStorage.setItem("token",token);
  }, [token]);

  return (
    <>
      <main>
        <ToastContainer />
        {token === '' ? (
          <Login setToken={setToken}  />
        ) : (
          <div className="flex">
            <SideBar token={token} setToken={setToken} />
            <div className="flex-4/5">
            <Routes>
              <Route path="/" element={<AddFood token={token} />} />
              <Route path="/list" element={<ListFood token={token} />} />
            </Routes>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
