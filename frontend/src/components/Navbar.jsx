import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

import logo from "../assets/logo.svg";

import "../styles/Navbar.css";

export default function Navbar() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navListContainerRef = useRef(null);
  const burgerMenuRef = useRef(null);

  const toggleBurgerMenu = () => {
    if (burgerMenuOpen) {
      navListContainerRef.current.classList.add("closing");
      setTimeout(() => {
        setBurgerMenuOpen(false);
        navListContainerRef.current.classList.remove("closing");
      }, 0);
    } else {
      setBurgerMenuOpen(true);
    }
  };

  useEffect(() => {
    if (navListContainerRef.current) {
      navListContainerRef.current.addEventListener("animationend", () => {
        navListContainerRef.current.classList.remove("closing");
      });
    }
  }, []);

  return (
    <header className="App-header">
      <nav className="main-navigation">
        <div className="logo-container">
          <Link to="/" className="nav-link">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div
          ref={navListContainerRef}
          className={`nav-list-container ${burgerMenuOpen ? "open" : ""}`}
        >
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/portfolio" className="nav-link">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <button
          ref={burgerMenuRef}
          type="button"
          aria-label="ouverte/fermeture du menu"
          className={`burger-menu ${burgerMenuOpen ? "open" : ""}`}
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
