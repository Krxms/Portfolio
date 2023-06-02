import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../styles/NavbarHome.css";

export default function NavbarHome() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const burgerMenuRef = useRef(null);
  const navLinksRefs = useRef([]);

  if (navLinksRefs.current.length !== 4) {
    navLinksRefs.current = Array(4)
      .fill()
      .map(() => React.createRef());
  }

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  useEffect(() => {
    const closeMenu = () => {
      burgerMenuRef.current.classList.remove("clicked", "fermeture");
    };

    if (burgerMenuOpen) {
      navLinksRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.remove("animation-completed");
        }
      });

      if (burgerMenuRef.current) {
        burgerMenuRef.current.classList.remove("fermeture");
      }

      setTimeout(closeMenu, 500);
    } else {
      closeMenu();
    }
  }, [burgerMenuOpen]);

  useEffect(() => {
    const handleAnimationEnd = (ref) => {
      ref.current.classList.add("animation-completed");
    };

    navLinksRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener("animationend", () =>
          handleAnimationEnd(ref)
        );
      }
    });

    return () => {
      navLinksRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener("animationend", () =>
            handleAnimationEnd(ref)
          );
        }
      });
    };
  }, []);

  return (
    <header className="App-headerHome">
      <nav className="main-navigationHome">
        <div
          className={`nav-list-containerHome${burgerMenuOpen ? " open" : ""}`}
        >
          <ul className="nav-listHome">
            <li className="nav-itemHome">
              <Link
                ref={navLinksRefs.current[0]}
                to="/contact"
                className="nav-linkHome"
              >
                Contact
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link
                ref={navLinksRefs.current[1]}
                to="/portfolio"
                className="nav-linkHome"
              >
                Portfolio
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link
                ref={navLinksRefs.current[2]}
                to="/about"
                className="nav-linkHome"
              >
                About
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link
                ref={navLinksRefs.current[3]}
                to="/"
                className="nav-linkHome"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <button
          ref={burgerMenuRef}
          type="button"
          aria-label="ouverte/fermeture du menu"
          className={`burger-menuHome ${burgerMenuOpen ? "open" : ""} ${
            !burgerMenuOpen ? "fermeture" : ""
          }`}
          onClick={toggleBurgerMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
