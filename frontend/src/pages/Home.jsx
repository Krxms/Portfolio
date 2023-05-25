import { useState, useEffect } from "react";
import VantaFog from "../components/VantaFog";
import CustomCursor from "../components/CustomCursor";
import NavbarHome from "../components/NavbarHome";

import "../styles/Home.css";

export default function Home() {
  const [color, setColor] = useState("#219dd3");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  const changeColor = () =>
    setColor((prevColor) => (prevColor === "#219dd3" ? "#F7480F" : "#219dd3"));

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      document.addEventListener("click", changeColor);
    } else {
      document.removeEventListener("click", changeColor);
    }

    return () => {
      document.removeEventListener("click", changeColor);
    };
  }, [isSmallScreen]);

  return (
    <div className="homePage">
      <VantaFog />
      <CustomCursor />
      <NavbarHome />
      <div className="background-animation">
        <div className="noise-layer" />
        <div className="blur-layer" />
      </div>
      <div className="Home">
        <div className="homeTitleContainer">
          <div className="line-1">Hi,</div>
          <div className="line-2">my name</div>
          <div className="line-3">
            is{" "}
            <span
              className="antoine"
              style={{ color: isSmallScreen ? color : undefined }}
            >
              Antoine
            </span>
          </div>
          <div className="line-4-desktop">
            UI/UX DESIGNER &nbsp; ◆ ◆ &nbsp; CREATIVE DEVELOPER &nbsp; ◆ ◆
            &nbsp; WEB DEVELOPER
          </div>
          <div className="line-4-mobile">
            <p>
              UI/UX DESIGNER • CREATIVE DEVELOPER • WEB DEVELOPER <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
