import React from "react";
import Vignette from "../components/Vignette";

import "../styles/Portfolio.css";
import Navbar from "../components/Navbar";
import VantaFog from "../components/VantaFog";

function Portfolio() {
  return (
    <div className="portfolioPage">
      <VantaFog />
      <Navbar />
      <Vignette />
    </div>
  );
}

export default Portfolio;
