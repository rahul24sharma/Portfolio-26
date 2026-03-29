import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolioData";

const Landing = ({ children }: PropsWithChildren) => {
  const { hero } = portfolioData;

  return (
    <>
      <section
        className="landing-section"
        id="landingDiv"
        aria-label="Introduction"
      >
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{hero.greeting}</h2>
            <h1>
              {hero.firstName}
              <br />
              <span>{hero.lastName}</span>
            </h1>
          </div>
          {children && <div className="landing-visual">{children}</div>}
          <div className="landing-info">
            <h3>{hero.rolePrefix}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{hero.rolePrimary}</div>
              <div className="landing-h2-2">{hero.roleSecondary}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{hero.roleSecondary}</div>
              <div className="landing-h2-info-1">{hero.rolePrimary}</div>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
