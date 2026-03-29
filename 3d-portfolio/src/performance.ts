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
  const reportedMemory = nav.deviceMemory;
  const reportedCores = nav.hardwareConcurrency;

  /* DevTools “responsive” still uses desktop navigator, so local looks “full” while
     real phones often report 4 cores or 4GB RAM — old thresholds (<=4) forced lite
     and the CSS-only “capsule” fallback on many handsets. Only treat *reported*
     very low values as lite; missing APIs default to full. */
  const veryLowMemory =
    typeof reportedMemory === "number" && reportedMemory <= 2;
  const veryLowCores =
    typeof reportedCores === "number" && reportedCores <= 2;

  return prefersReducedMotion ||
    saveData ||
    veryLowMemory ||
    veryLowCores
    ? "lite"
    : "full";
}
