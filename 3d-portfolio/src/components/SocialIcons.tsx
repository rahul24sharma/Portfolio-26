import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { portfolioData } from "../data/portfolioData";

const SocialIcons = () => {
  const { socialLinks } = portfolioData;
  const iconLinks = [
    { href: socialLinks.github, icon: <FaGithub />, label: "GitHub" },
    { href: socialLinks.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
    {
      href: "youtube" in socialLinks ? socialLinks.youtube : undefined,
      icon: <FaYoutube />,
      label: "YouTube",
    },
    {
      href: "instagram" in socialLinks ? socialLinks.instagram : undefined,
      icon: <FaInstagram />,
      label: "Instagram",
    },
  ].filter((item): item is { href: string; icon: JSX.Element; label: string } =>
    Boolean(item.href)
  );

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animationFrameId = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animationFrameId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animationFrameId);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {iconLinks.map((link) => (
          <span key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </span>
        ))}
      </div>
      <a
        className="resume-button"
        href={socialLinks.resume}
        target="_blank"
        rel="noopener noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
