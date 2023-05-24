import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../styles/NavbarHome.css";

export default function NavbarHome() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const refs = useRef([]);
  const burgerMenuRef = useRef();

  if (refs.current.length !== 4) {
    refs.current = Array(4)
      .fill()
      .map((_, i) => refs.current[i] || React.createRef());
  }

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
    refs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("animation-completed");
      }
    });

    if (burgerMenuOpen && burgerMenuRef.current) {
      burgerMenuRef.current.classList.add("fermeture");
    }

    setTimeout(() => {
      if (burgerMenuRef.current) {
        burgerMenuRef.current.classList.remove("clicked", "fermeture");
      }
    }, 500);
  };

  useEffect(() => {
    refs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener("animationend", () => {
          ref.current.classList.add("animation-completed");
        });
      }
    });
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
                ref={refs.current[0]}
                to="/contact"
                className="nav-linkHome"
              >
                Contact
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link
                ref={refs.current[1]}
                to="/portfolio"
                className="nav-linkHome"
              >
                Portfolio
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link ref={refs.current[2]} to="/about" className="nav-linkHome">
                About
              </Link>
            </li>
            <li className="nav-itemHome">
              <Link ref={refs.current[3]} to="/" className="nav-linkHome">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <button
          ref={burgerMenuRef}
          type="button"
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
