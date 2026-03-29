import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";

const WhatIDo = () => {
  const { whatIDo } = portfolioData;
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const onClick = () => handleClick(container);
          container.addEventListener("click", onClick);
          cleanupFns.push(() => container.removeEventListener("click", onClick));
        }
      });
    }

    return () => cleanupFns.forEach((cleanup) => cleanup());
  }, []);
  return (
    <section className="whatIDO" aria-labelledby="whatido-heading">
      <div className="what-box">
        <h2 className="title" id="whatido-heading">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          {whatIDo.cards.map((card, index) => (
            <div
              className="what-content what-noTouch"
              ref={(el) => setRef(el, index)}
              key={`${card.heading}-${index}`}
            >
              <div className="what-border1">
                <svg height="100%">
                  {index === 0 && (
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  )}
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner"></div>

              <div className="what-content-in">
                <h3>{card.heading}</h3>
                <h4>{card.subheading}</h4>
                <p>{card.description}</p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  {card.tags.map((tag) => (
                    <div className="what-tags" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="what-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
