import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ClubePage from "./pages/ClubePage";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<ClubePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
