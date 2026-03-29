import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({
  children,
  enabled = true,
}: PropsWithChildren<{ enabled?: boolean }>) => {
  const [isLoading, setIsLoading] = useState(enabled);
  const [loading, setLoading] = useState(enabled ? 0 : 100);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {enabled && isLoading && <Loading percent={loading} />}
      <main className="main-body" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
