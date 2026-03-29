import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { portfolioData } from "../data/portfolioData";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | undefined;

const SMOOTHER_MIN = 1024;

function createSmoother(): ScrollSmoother | undefined {
  if (window.innerWidth <= SMOOTHER_MIN) return undefined;
  const instance = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.7,
    speed: 1.7,
    effects: true,
    autoResize: true,
    ignoreMobileResize: true,
  });
  smoother = instance;
  instance.scrollTop(0);
  instance.paused(true);
  return instance;
}

function destroySmoother() {
  smoother?.kill();
  smoother = undefined;
}

const Navbar = () => {
  const { navbar } = portfolioData;
  const clickHandlersRef = useRef<
    Array<{ element: HTMLAnchorElement; onClick: (e: Event) => void }>
  >([]);

  useEffect(() => {
    const onResizeWidth = () => {
      const w = window.innerWidth;

      if (w <= SMOOTHER_MIN && smoother) {
        destroySmoother();
      } else if (w > SMOOTHER_MIN && !smoother) {
        createSmoother();
      }
      try {
        ScrollSmoother.refresh(true);
      } catch {
        /* no instance */
      }
    };

    createSmoother();

    const links = document.querySelectorAll(".header ul a");
    clickHandlersRef.current = Array.from(links).map((elem) => {
      const element = elem as HTMLAnchorElement;
      const onClick = (e: Event) => {
        if (window.innerWidth > SMOOTHER_MIN && smoother) {
          e.preventDefault();
          const current = e.currentTarget as HTMLAnchorElement;
          const section = current.getAttribute("data-href");
          if (section) smoother.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", onClick);
      return { element, onClick };
    });

    window.addEventListener("resize", onResizeWidth);

    return () => {
      clickHandlersRef.current.forEach(({ element, onClick }) => {
        element.removeEventListener("click", onClick);
      });
      window.removeEventListener("resize", onResizeWidth);
      destroySmoother();
    };
  }, []);

  return (
    <>
      <header className="header" role="banner">
        <a
          href="/"
          className="navbar-title"
          data-cursor="disable"
          aria-label="Home"
        >
          {navbar.initials}
        </a>
        <a
          href={navbar.connectUrl}
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          {navbar.connectLabel}
        </a>
        <nav id="primary-nav" className="header-nav">
          <ul>
            <li>
              <a data-href="#about" href="#about">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work">
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
