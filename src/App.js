import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Layout from "./layout/layout";
import BoardResponsive from "./pages/UserPage/BoardPage/BoardResponsive";
import ManagementResponsive from "./pages/UserPage/ManagementPage/ManagementResponsive";
import CreateResponsive from "./pages/UserPage/CreatePage/CreateResponsive";
import LoginPageResponsive from "./pages/LoginPage/LoginPageResponsive";
import RegisterPageResponsive from "./pages/RegisterPage/RegisterPageResponsive";



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

        <Route path="/login" element={<LoginPageResponsive />} />
        <Route path="/register" element={<RegisterPageResponsive />} />

      </Routes>
    </BrowserRouter>


  );
}

export default App;
