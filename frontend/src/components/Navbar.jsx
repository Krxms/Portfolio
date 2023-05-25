import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

import logo from "../assets/logo.svg";

import "../styles/Navbar.css";

export default function Navbar() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navListContainer = useRef(null);
  const burgerMenuRef = useRef();

  const toggleBurgerMenu = () => {
    if (burgerMenuOpen) {
      navListContainer.current.classList.add("closing");
      burgerMenuRef.current.classList.add("fermeture");
      setTimeout(() => {
        setBurgerMenuOpen(false);
        navListContainer.current.classList.remove("closing");
        burgerMenuRef.current.classList.remove("fermeture");
      }, 5);
    } else {
      setBurgerMenuOpen(true);
      burgerMenuRef.current.classList.remove("fermeture");
    }
  };

  useEffect(() => {
    if (navListContainer.current) {
      navListContainer.current.addEventListener("animationend", () => {
        navListContainer.current.classList.remove("closing");
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
          ref={navListContainer}
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
          className={`burger-menu ${burgerMenuOpen ? "open" : ""} ${
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
