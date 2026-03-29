import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const { contact, socialLinks } = portfolioData;
  const socialItems = [
    { label: "GitHub", href: socialLinks.github },
    { label: "LinkedIn", href: socialLinks.linkedin },
    {
      label: "YouTube",
      href: "youtube" in socialLinks ? socialLinks.youtube : undefined,
    },
    {
      label: "Instagram",
      href: "instagram" in socialLinks ? socialLinks.instagram : undefined,
    },
    {
      label: "Portfolio",
      href: "portfolio" in socialLinks ? socialLinks.portfolio : undefined,
    },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <section
      className="contact-section section-container"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact-container">
        <h3 id="contact-heading">Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>{contact.connectHeading}</h4>
            <p>
              <a
                href={contact.connectUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                {contact.connectLabel}
              </a>
            </p>
            <h4>{contact.educationHeading}</h4>
            {contact.education.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="contact-box">
            <h4>{contact.socialHeading}</h4>
            {socialItems.map((item) => (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
                key={item.label}
              >
                {item.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              {contact.creditPrefix} <br /> by <span>{contact.creditName}</span>
            </h2>
            <h5>
              <MdCopyright /> {contact.copyrightYear}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
