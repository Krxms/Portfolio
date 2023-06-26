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

import Github from "../assets/GitHubLogo.svg";

function GalleryComponent() {
  const images = [
    {
      preview: NorwayPreview,
      full: NorwayFull,
      title: "Norway",
      text: (
        <span>
          Maquette d'un site one page dédié à la découverte de la Norvège.
          Esthétique moderne et minimaliste visant à offrir une expérience
          fluide et immersive.
          <br />
          <br />
          <b>#Figma</b>
        </span>
      ),
    },
    {
      preview: StreetAppPreview,
      full: StreetAppFull,
      title: "Street App",
      textAbove: (
        <span>
          Site mobile permettant à l'utilisateur de partir à la découverte des
          œuvres de street art en ville. Projet de groupe.
          <br />
        </span>
      ),
      textBelow: (
        <span>
          <b>#React #SASS #NodeJs #MySQL #Figma</b>
        </span>
      ),
      link: "https://github.com/Krxms/Projet3-StreetApp",
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
          <b>#Figma</b>
        </span>
      ),
    },
    {
      preview: TheWitcherPreview,
      full: TheWitcherFull,
      title: "The Witcher",
      textAbove: (
        <span>
          Plongez dans l'univers de The Witcher avec ce site dynamique et
          interactif basé sur l'exploitation d'une API.
          <br />
        </span>
      ),
      textBelow: (
        <span>
          <b>#React #SASS #Figma #Illustrator #Midjourney</b>
        </span>
      ),
      link: "https://github.com/Krxms/Projet2-TheWitcherFront",
    },
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
        return currentTime - timestamp <= 2 * 60 * 60 * 1000;
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
                    {image.link && (
                      <a
                        className="repo-link"
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <img
                          className="github-portfolio"
                          src={Github}
                          alt="Github"
                        />
                      </a>
                    )}
                    <h1 className="white-title">{image.title}</h1>
                    <div className="white-text-container">
                      <p className="white-text">
                        {image.textAbove || image.text}
                      </p>
                    </div>
                    {image.textBelow && (
                      <div className="white-text-container">
                        <p className="white-text">{image.textBelow}</p>
                      </div>
                    )}
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
