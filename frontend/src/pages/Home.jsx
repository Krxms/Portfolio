import VantaFog from "../components/VantaFog";
import NavbarHome from "../components/NavbarHome";

import "../styles/Home.css";

export default function Home() {
  return (
    <div className="homePage">
      <VantaFog />
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
            is <span className="antoine">Antoine</span>
          </div>
          <div
            className="line-4-desktop"
            data-text="UI/UX DESIGNER &nbsp; ◆ ◆ &nbsp; CREATIVE DEVELOPER &nbsp; ◆ ◆ &nbsp; WEB DEVELOPER"
          >
            UI/UX DESIGNER &nbsp; ◆ ◆ &nbsp; CREATIVE DEVELOPER &nbsp; ◆ ◆
            &nbsp; WEB DEVELOPER
          </div>
          <div
            className="line-4-mobile"
            data-text="UI/UX DESIGNER • CREATIVE DEVELOPER • WEB DEVELOPER"
          >
            <p>UI/UX DESIGNER • CREATIVE DEVELOPER • WEB DEVELOPER</p>
          </div>
        </div>
      </div>
    </div>
  );
}
