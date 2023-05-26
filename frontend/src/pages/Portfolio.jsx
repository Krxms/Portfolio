import React from "react";
import Vignette from "../components/Vignette";

import "../styles/Portfolio.css";
import Navbar from "../components/Navbar";
// import CustomCursor from "../components/CustomCursor";
import VantaFog from "../components/VantaFog";

function Portfolio() {
  return (
    <div className="portfolioPage">
      <VantaFog />
      <Navbar />
      {/* <CustomCursor /> */}
      <Vignette />
    </div>
  );
}

export default Portfolio;
