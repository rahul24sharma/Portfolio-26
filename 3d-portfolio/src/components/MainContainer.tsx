import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({
  children,
  lightweightMode = false,
}: PropsWithChildren<{ lightweightMode?: boolean }>) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [shouldRenderTechStack, setShouldRenderTechStack] = useState(false);
  const techStackTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopView || shouldRenderTechStack) return;

    const trigger = techStackTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderTechStack(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [isDesktopView, shouldRenderTechStack]);

  return (
    <div className="container-main">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && !lightweightMode && (
              <>
                <div ref={techStackTriggerRef} aria-hidden="true" />
                {shouldRenderTechStack && (
                  <Suspense fallback={null}>
                    <TechStack />
                  </Suspense>
                )}
              </>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
