import { useEffect, useRef, useState } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const [useFinePointer, setUseFinePointer] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : false
  );
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setUseFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!useFinePointer) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    let cancelled = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    function loop() {
      if (cancelled) return;
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const cleanups: Array<() => void> = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
      cleanups.push(() => {
        element.removeEventListener("mouseover", onOver);
        element.removeEventListener("mouseout", onOut);
      });
    });

    return () => {
      cancelled = true;
      document.removeEventListener("mousemove", onMove);
      cleanups.forEach((fn) => fn());
    };
  }, [useFinePointer]);

  if (!useFinePointer) return null;

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
