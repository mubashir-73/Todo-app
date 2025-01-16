import Main from "./components/Main";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Layout from "./components/layout";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/main" element={<Main />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}
