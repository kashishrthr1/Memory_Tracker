import React from "react";
import "../App.css";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
