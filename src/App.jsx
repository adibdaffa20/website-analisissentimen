import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SentimentTester from "./components/SentimentTester";
import Home from "./components/Home"; // gunakan path sesuai lokasi kamu menyimpan Home.jsx

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cek-sentimen" element={<SentimentTester />} />
      </Routes>
    </Router>
  );
}


export default App;
