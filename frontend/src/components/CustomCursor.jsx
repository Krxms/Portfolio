import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import "../styles/CustomCursor.css";

function CustomCursor() {
  const cursor = useRef(null);
  const initCursor = useRef(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    if (!isDesktop) return;

    const links = document.querySelectorAll("a");
    const cursorElement = cursor.current;

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursorElement.classList.add("custom-cursor--link");
        link.classList.add("hide-default-cursor");
      });
      link.addEventListener("mouseout", () => {
        cursorElement.classList.remove("custom-cursor--link");
        link.classList.remove("hide-default-cursor");
      });
    });

    const onMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!initCursor.current) {
        gsap.to(cursorElement, {
          duration: 0.3,
          opacity: 1,
        });
        initCursor.current = true;
      }

      gsap.to(cursorElement, {
        duration: 0,
        top: `${mouseY}px`,
        left: `${mouseX}px`,
      });
    };

    const onMouseOut = () => {
      gsap.to(cursorElement, {
        duration: 0.3,
        opacity: 0,
      });
      initCursor.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [isDesktop]);

  return isDesktop ? <div className="custom-cursor" ref={cursor} /> : null;
}

export default CustomCursor;
