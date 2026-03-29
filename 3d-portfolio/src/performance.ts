export type PerformanceMode = "full" | "lite";

export function getPerformanceMode(): PerformanceMode {
  if (typeof window === "undefined") {
    return "full";
  }

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const saveData = nav.connection?.saveData === true;
  const deviceMemory = nav.deviceMemory ?? 8;
  const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
  const smallScreen = window.innerWidth < 900;

  return prefersReducedMotion ||
    saveData ||
    deviceMemory <= 4 ||
    hardwareConcurrency <= 4 ||
    smallScreen
    ? "lite"
    : "full";
}
