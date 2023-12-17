import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserPage from "./pages/UserPage/UserPage";
import Layout from "./layout/layout";
import Create from "./pages/UserPage/Create";
import Board from "./pages/UserPage/Board";
import Management from "./pages/UserPage/Management";



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
          <Route path="/user/Create" element={<Create />} />
        </Route>
        <Route path="/user" element={<UserPage />} >
          <Route path="/user/Management" element={<Management />} />
          <Route path="/user/Board" element={<Board />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        {/* <Route path="/local/:id/ticket/:id" element={<ListTicketResponsive />} /> */}
        {/* <Route path="/ticket/:id" element={<ListTicketResponsive />} /> */}
        {/* <Route path="/local/:id" element={<DetailLocalResponsive />} /> */}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
