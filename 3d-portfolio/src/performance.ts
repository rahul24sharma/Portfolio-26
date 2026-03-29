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

  /* Do not force "lite" from width alone: that replaces the GLTF hero with the
     CSS fallback (orb + blob), which reads as a "capsule" on phones. Lite is
     for save-data, reduced motion, or clearly constrained hardware only. */
  return prefersReducedMotion ||
    saveData ||
    deviceMemory <= 4 ||
    hardwareConcurrency <= 4
    ? "lite"
    : "full";
}
