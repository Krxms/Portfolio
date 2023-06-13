import React, { useState, useEffect } from "react";

import "../styles/Vignette.css";

import NorwayPreview from "../assets/NorwayPreview.svg";
import NorwayFull from "../assets/NorwaySinglePage.webp";
import StreetAppPreview from "../assets/StreetAppPreview.svg";
import StreetAppFull from "../assets/StreetApp.webp";
import MeditatePreview from "../assets/MeditatePreview.svg";
import MeditateFull from "../assets/Meditate.webp";
import TheWitcherPreview from "../assets/TheWitcherPreview.svg";
import TheWitcherFull from "../assets/TheWitcher.webp";

function GalleryComponent() {
  const images = [
    {
      preview: NorwayPreview,
      full: NorwayFull,
      title: "Norway",
      text: (
        <span>
          Idée de design pour un site one page proposant une découverte de la
          Norvège par ses régions et sa nature.
          <br />
          <br />
          <b>Maqette Figma</b>
        </span>
      ),
    },
    {
      preview: StreetAppPreview,
      full: StreetAppFull,
      title: "Street App",
      text: (
        <span>
          Site mobile permettant à l'utilisateur de partir à la découverte des
          œuvres de street art en ville. Projet de groupe.
          <br />
          <br />
          <b>React, SASS, NodeJs, MySQL, Figma.</b>
          <br />{" "}
          <a
            className="repo-link"
            href="https://github.com/Krxms/Projet3-StreetApp"
          >
            <i>Visionner le Code</i>
          </a>
        </span>
      ),
    },
    {
      preview: MeditatePreview,
      full: MeditateFull,
      title: "Meditate",
      text: (
        <span>
          Concept d'une application de méditation avec un design d'interface
          simple et intuitif, utilisant des couleurs douces et des éléments de
          style neumorphique.
          <br />
          <br />
          <b>Maquette Figma</b>
        </span>
      ),
    },
    {
      preview: TheWitcherPreview,
      full: TheWitcherFull,
      title: "The Witcher",
      text: (
        <span>
          {/* Aventurez-vous dans le monde de The Witcher, découvrez les personnages
          et les lieux emblématiques. Site dynamique basé sur l'exploitation
          d'une API. Design interactif, utilisation de Midjourney pour les
          images et d'un bande son.  */}
          Plongez dans l'univers de The Witcher avec ce site dynamique et
          interactif basé sur l'exploitation d'une API.
          <br />
          <br />
          <b>
            React, SASS, Figma, Adobe Illustrator, Midjourney et Ableton Live
            (audio).
          </b>
          <br />{" "}
          <a
            className="repo-link"
            href="https://github.com/Krxms/Projet2-TheWitcherFront"
          >
            <i>Visionner le code</i>
          </a>
        </span>
      ),
    },
    // "https://placeimg.com/640/480/any",
    // "https://placeimg.com/640/480/people",
    // "https://placeimg.com/640/480/any",
  ];

  const [currentImage, setCurrentImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCurrentImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isImageCached = (src) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cacheData = localStorage.getItem(src);
      if (cacheData) {
        const { timestamp } = JSON.parse(cacheData);
        const currentTime = new Date().getTime();
        return currentTime - timestamp <= 2 * 60 * 60 * 1000; // 2 heures en millisecondes
      }
    }
    return false;
  };

  const handleImageLoad = (src) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [src]: true,
    }));

    if (typeof window !== "undefined" && window.localStorage) {
      // Stocker la date de récupération de l'image dans le cache
      const cacheData = JSON.stringify({ timestamp: new Date().getTime() });
      localStorage.setItem(src, cacheData);
    }
  };

  return (
    <div className="container">
      <div className="gallery">
        {images.map((image, index) => {
          const isStringImage = typeof image === "string";
          const previewSrc = isStringImage ? image : image.preview;
          const fullSrc = isStringImage ? image : image.full;
          const key = isStringImage ? `image-${index}` : image.title;

          return (
            <div className="view overlay hm-black-light gallery-item" key={key}>
              <div className="img-container">
                <img
                  src={previewSrc}
                  alt={`Element de galerie ${index + 1}`}
                  className="img-fluid"
                  onLoad={() => handleImageLoad(previewSrc)}
                  style={{
                    display:
                      loadedImages[previewSrc] || isImageCached(previewSrc)
                        ? "block"
                        : "none",
                  }}
                />
                {!loadedImages[previewSrc] && !isImageCached(previewSrc) && (
                  <div className="spinner">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} />
                    ))}
                  </div>
                )}
              </div>
              <div
                className="mask flex-center"
                onClick={() => setCurrentImage(fullSrc)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setCurrentImage(fullSrc);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {!isStringImage && (
                  <>
                    <h1 className="white-title">{image.title}</h1>
                    <p className="white-text">{image.text}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {currentImage && (
        <div
          className="popup"
          onClick={() => setCurrentImage(null)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setCurrentImage(null);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img
            src={currentImage}
            alt="Agrandissement"
            className="popup-image"
          />
        </div>
      )}
    </div>
  );
}

export default GalleryComponent;
