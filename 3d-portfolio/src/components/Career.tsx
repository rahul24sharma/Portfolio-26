import "./styles/Career.css";
import { portfolioData } from "../data/portfolioData";

const Career = () => {
  const { career } = portfolioData;
  const careerTitle =
    typeof career.title === "string"
      ? {
          firstLine: "My career",
          highlight: "&",
          secondLine: career.title.split("&")[1]?.trim() || "experience",
        }
      : career.title;

  return (
    <section className="career-section section-container" aria-labelledby="career-heading">
      <div className="career-container">
        <h2 id="career-heading">
          {careerTitle.firstLine} <span>{careerTitle.highlight}</span>
          <br /> {careerTitle.secondLine}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {career.items.map((item) => (
            <div className="career-info-box" key={`${item.role}-${item.company}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <div className="career-period">
                  <span>{item.period}</span>
                </div>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
