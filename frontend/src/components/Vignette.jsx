import React, { useState } from "react";
import "../styles/Vignette.css";

import NorwayPreview from "../assets/NorwayPreview.svg";
import NorwayFull from "../assets/NorwaySinglePage.webp";
import StreetAppPreview from "../assets/StreetAppPreview.svg";
import StreetAppFull from "../assets/StreetApp.webp";

function GalleryComponent() {
  const images = [
    {
      preview: NorwayPreview,
      full: NorwayFull,
      title: "Norway",
      text: "Exercice autour d'un site one page qui propose à l'utilisateur une découverte ciblée de la flore Norvégienne.",
    },
    {
      preview: StreetAppPreview,
      full: StreetAppFull,
      title: "Street App",
      text: "Site mobile visant à permettre à l'utilisateur la découverte d'oeuvres de street art autour de lui.",
    },
    "https://placeimg.com/640/480/tech",
    "https://placeimg.com/640/480/animals",
    "https://placeimg.com/640/480/people",
    "https://placeimg.com/640/480/any",
  ];

  const [currentImage, setCurrentImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setCurrentImage(null);
    }
  };

  const handleImageLoad = (src) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [src]: true,
    }));
  };

  return (
    <div className="container">
      <div className="gallery">
        {images.map((image, index) => (
          <div
            className="view overlay hm-black-light gallery-item"
            key={typeof image === "string" ? `image-${index}` : image.title}
          >
            <div className="img-container">
              <img
                src={typeof image === "string" ? image : image.preview}
                alt={`Element de galerie ${index + 1}`}
                className="img-fluid"
                onLoad={() =>
                  handleImageLoad(
                    typeof image === "string" ? image : image.preview
                  )
                }
                style={{
                  display: loadedImages[
                    typeof image === "string" ? image : image.preview
                  ]
                    ? "block"
                    : "none",
                }}
              />
              {!loadedImages[
                typeof image === "string" ? image : image.preview
              ] && (
                <div className="spinner">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              )}
            </div>
            <div
              className="mask flex-center"
              onClick={() =>
                setCurrentImage(typeof image === "string" ? image : image.full)
              }
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <h1 className="white-title">
                {typeof image === "string" ? "" : image.title}
              </h1>
              <p className="white-text">
                {typeof image === "string" ? "" : image.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {currentImage && (
        <div
          className="popup"
          onClick={() => setCurrentImage(null)}
          onKeyDown={handleKeyDown}
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
