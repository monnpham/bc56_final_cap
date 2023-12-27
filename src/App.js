import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserPage from "./pages/UserPage/UserPage";
import Layout from "./layout/layout";
import BoardResponsive from "./pages/UserPage/BoardPage/BoardResponsive";
import ManagementResponsive from "./pages/UserPage/ManagementPage/ManagementResponsive";
import CreateResponsive from "./pages/UserPage/CreatePage/CreateResponsive";



function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Spinner />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/user" element={<UserPage />} >
          <Route path="/user/Create" element={<CreateResponsive />} />
          <Route path="/user/Management" element={<ManagementResponsive />} />
          <Route path="/user/Board" element={<BoardResponsive />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />



      </Routes>
    </BrowserRouter>


  );
}

export default App;
