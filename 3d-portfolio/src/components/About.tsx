import "./styles/About.css";
import { portfolioData } from "../data/portfolioData";

const About = () => {
  const { about } = portfolioData;

  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="about-me">
        <h3 className="title" id="about-heading">
          {about.title}
        </h3>
        <p className="para">{about.description}</p>
      </div>
    </section>
  );
};

export default About;
