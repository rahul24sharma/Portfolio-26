import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { portfolioData } from "./data/portfolioData";
import { getPerformanceMode } from "./performance";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [performanceMode] = useState(() => getPerformanceMode());
  const isLiteMode = performanceMode === "lite";

  useEffect(() => {
    document.title = portfolioData.siteTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", portfolioData.metaDescription);
    }
    const origin = window.location.origin;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `${origin}/`);
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `${origin}/`);
    }
  }, []);

  return (
    <>
      <LoadingProvider enabled={!isLiteMode}>
        <Suspense>
          <MainContainer lightweightMode={isLiteMode}>
            <Suspense>
              <CharacterModel lightweightMode={isLiteMode} />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
