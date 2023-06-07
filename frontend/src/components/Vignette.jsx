import React, { useState, useEffect } from "react";

import "../styles/Vignette.css";

import NorwayPreview from "../assets/NorwayPreview.svg";
import NorwayFull from "../assets/NorwaySinglePage.webp";
import StreetAppPreview from "../assets/StreetAppPreview.svg";
import StreetAppFull from "../assets/StreetApp.webp";
import MeditatePreview from "../assets/MeditatePreview.svg";
import MeditateFull from "../assets/Meditate.webp";

function GalleryComponent() {
  const images = [
    {
      preview: NorwayPreview,
      full: NorwayFull,
      title: "Norway",
      text: "Design autour d'un site one page proposant à l'utilisateur une découverte ciblée de la flore et vie touristique Norvégienne.",
    },
    {
      preview: StreetAppPreview,
      full: StreetAppFull,
      title: "Street App",
      text: (
        <span>
          Site mobile permettant à l'utilisateur de partir à la découverte des
          œuvres de street art en ville. Projet de groupe.{" "}
          <a
            className="repo-link"
            href="https://github.com/Krxms/Projet3-StreetApp"
          >
            <i>(GitHub)</i>
          </a>
        </span>
      ),
    },
    {
      preview: MeditatePreview,
      full: MeditateFull,
      title: "Meditate App",
      text: "Concept d'une application de méditation avec un design d'interface simple et intuitif, utilisant des couleurs douces et des éléments de style neumorphique.",
    },
    "https://placeimg.com/640/480/animals",
    "https://placeimg.com/640/480/people",
    "https://placeimg.com/640/480/any",
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
