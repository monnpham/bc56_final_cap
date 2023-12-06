import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner/Spinner";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Spinner />
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:id" element={<DetailMovieResponsive />} />
          <Route path="/local/:id/ticket/:id" element={<ListTicketResponsive />} />
          <Route path="/ticket/:id" element={<ListTicketResponsive />} />
          <Route path="/local/:id" element={<DetailLocalResponsive />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
