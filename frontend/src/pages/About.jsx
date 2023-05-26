import Navbar from "../components/Navbar";
// import CustomCursor from "../components/CustomCursor";
import VantaFog from "../components/VantaFog";

import pp from "../assets/pp.png";

import "../styles/About.css";

export default function About() {
  return (
    <div className="aboutPage">
      <VantaFog />
//       <CustomCursor />
      <Navbar />
      <div className="background-animation" />
      <div className="About">
        <div className="aboutTitleContainer">
          <img src={pp} alt="profilPicture" className="profilePicture" />
          <h1 className="aboutTitle">
            <span className="antoineAbout">Antoine</span>&nbsp;Bruneau
          </h1>
          <h2 className="aboutSubtitle">
            EN RECHERCHE D'ALTERNANCE{" "}
            <span className="alternance">UI/UX DESIGNER</span>
          </h2>
          <p className="aboutMe">
            Créatif et passionné par l'accessibilité, c'est après une première
            carrière dans le domaine du spectacle que j'ai choisi de me
            reconvertir dans l'UX et l'UI design. <br /> En constant
            apprentissage, l'évolution des espaces de vie numériques stimule en
            moi le désir d'apporter ma vision au service d'un Web plus
            accessible et conscient des enjeux sociaux et écologiques.
            <br /> Une première formation dans le développement web m'a permis
            de mieux cibler les enjeux et ma place au sein de cet écosystème ;
            je suis actuellement à la recherche d'une alternance pour{" "}
            <b>Octobre 2023.</b>
          </p>
        </div>
      </div>
    </div>
  );
}
