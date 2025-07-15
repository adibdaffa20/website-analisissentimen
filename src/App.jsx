import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SentimentTester from "./components/SentimentTester";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cek-sentimen" element={<SentimentTester />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
