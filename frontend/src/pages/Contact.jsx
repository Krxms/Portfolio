import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";
import VantaFog from "../components/VantaFog";

import Linkedin from "../assets/LinkedinLogo.svg";
import Github from "../assets/GitHubLogo.svg";

import "../styles/Contact.css";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1400);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function sendEmail(e) {
    e.preventDefault();
    setIsSending(true); // L'envoi commence

    emailjs
      .sendForm(
        "service_zakjtch",
        "template_ukikjvi",
        e.target,
        "tFU39PwuIQz-qrMQ-"
      )
      .then(
        () => {
          toast.success("Votre message a été envoyé");
          e.target.reset();
          setIsSending(false); // L'envoi est terminé
        },
        () => {
          toast.error("Une erreur s'est produite lors de l'envoi du message");
          setIsSending(false); // L'envoi est terminé même si une erreur s'est produite
        }
      );
  }

  return (
    <div className="contactPage">
      <ToastContainer />
      <VantaFog />
      <CustomCursor />
      <Navbar />
      <div className="main-container">
        <div className="contact-container">
          <div className="contact-infos">
            <h1 className="contact-title">
              <span className="get-blue">Get</span> in touch
            </h1>
            <h2 className="my-contact">contact@antoinebruneau.fr</h2>
            <div className="contact-section">
              <div className="contact-logos">
                {isSmallScreen ? (
                  <>
                    <a
                      href="https://www.linkedin.com/in/antoine-bruneau/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="linkedin-logo"
                        src={Linkedin}
                        alt="Linkedin"
                      />
                    </a>
                    <a
                      href="https://github.com/Krxms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img className="github-logo" src={Github} alt="Github" />
                    </a>
                  </>
                ) : (
                  <>
                    <img
                      className="linkedin-logo"
                      src={Linkedin}
                      alt="Linkedin"
                    />
                    <img className="github-logo" src={Github} alt="Github" />
                  </>
                )}
              </div>
              <div className="contact-links">
                <a
                  href="https://www.linkedin.com/in/antoine-bruneau/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="linkedin">Linkedin</p>
                </a>
                <a
                  href="https://github.com/Krxms"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="github">Github</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="form-container">
          <form className="form-container" onSubmit={sendEmail}>
            <div className="input-row">
              <input
                name="user_name"
                id="input-name"
                type="text"
                placeholder="Nom"
                required
              />
              <input
                name="user_email"
                id="input-email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <textarea
              name="message"
              id="input-message"
              placeholder="Message"
              required
            />
            <button id="submit-button" type="submit" disabled={isSending}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
