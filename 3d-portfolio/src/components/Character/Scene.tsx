import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const alignCharacterForViewport = (
  character: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  canvasEl?: HTMLElement | null
) => {
  if (window.innerWidth > 1024) {
    character.position.set(0, 0, 0);
    character.updateMatrixWorld(true);
    const boxD = new THREE.Box3().setFromObject(character);
    const centerD = boxD.getCenter(new THREE.Vector3());
    const sizePre = boxD.getSize(new THREE.Vector3());
    // Nudge the rig down in world space so the cap/head clears the top of the viewport.
    character.position.set(-centerD.x, -sizePre.y * 0.07, 0);
    character.updateMatrixWorld(true);
    const boxD2 = new THREE.Box3().setFromObject(character);
    const cD = boxD2.getCenter(new THREE.Vector3());
    const sD = boxD2.getSize(new THREE.Vector3());

    const rectD = canvasEl?.getBoundingClientRect();
    const aspectD =
      rectD && rectD.height > 0
        ? rectD.width / rectD.height
        : window.innerWidth / window.innerHeight;

    // Wide FOV + further Z + look at upper chest/head — keeps head in frame; extra space tends to sit below.
    camera.fov = aspectD > 1.85 ? 18.5 : 17.5;
    camera.position.set(0, 12.95, 29.4);
    camera.zoom = 1.02;
    camera.lookAt(0, cD.y + sD.y * 0.4, cD.z);
    camera.updateProjectionMatrix();
    return;
  }

  // Measure from rest pose so resize does not stack offsets.
  character.position.set(0, 0, 0);
  character.updateMatrixWorld(true);

  const box0 = new THREE.Box3().setFromObject(character);
  const center0 = box0.getCenter(new THREE.Vector3());

  // Horizontal center only — do not shift down in Y (that framed the wrong half / clipped the top).
  character.position.set(-center0.x, 0, 0);
  character.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(character);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  const rect = canvasEl?.getBoundingClientRect();
  const cw = rect && rect.width > 0 ? rect.width : window.innerWidth;
  const ch = rect && rect.height > 0 ? rect.height : window.innerHeight;
  const aspect = cw / Math.max(ch, 1);

  const isSmallPhone = window.innerWidth <= 600;
  const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;

  // Wider vertical FOV than desktop (14.5) — critical for short/wide hero boxes.
  camera.fov = aspect > 1.15 ? 24 : 22;

  const wideAspectBoost = aspect > 1 ? 1 + Math.min((aspect - 1) * 0.38, 0.58) : 1;

  let z = isSmallPhone ? 35 : isTablet ? 37 : 36;
  z *= wideAspectBoost;

  const camY = isSmallPhone ? 12.75 : isTablet ? 13.35 : 13.1;

  camera.position.set(0, camY, z);
  // Aim at head / upper chest so the top of the figure stays in frame; legs clip at the bottom.
  const lookY = center.y + size.y * 0.3;
  camera.lookAt(0, lookY, center.z);

  camera.zoom = isSmallPhone ? 0.88 : aspect > 1.05 ? 0.86 : 0.88;
  camera.updateProjectionMatrix();
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const characterRef = useRef<THREE.Object3D | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const desktopInit = window.innerWidth > 1024;
      const camera = new THREE.PerspectiveCamera(
        desktopInit ? 17.5 : 14.5,
        aspect,
        0.1,
        1000
      );
      camera.position.z = 10;
      camera.position.set(0, 13.1, desktopInit ? 29.4 : 24.7);
      camera.zoom = desktopInit ? 1.02 : 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Mesh | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);
      let destroyed = false;
      let animationFrameId: number | null = null;
      let isDocumentVisible = !document.hidden;
      let isCanvasVisible = true;
      let lastFrameTime = 0;

      loadCharacter().then((gltf) => {
        if (destroyed) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          alignCharacterForViewport(character, camera, canvasDiv.current);
          characterRef.current = character;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          {
            const sl = character.getObjectByName("screenlight");
            screenLight = sl instanceof THREE.Mesh ? sl : null;
          }
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", onResize);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };
      const onResize = () => {
        if (characterRef.current) {
          handleResize(renderer, camera, canvasDiv, characterRef.current);
          alignCharacterForViewport(
            characterRef.current,
            camera,
            canvasDiv.current
          );
        }
      };
      const onVisibilityChange = () => {
        isDocumentVisible = !document.hidden;
        if (isDocumentVisible) {
          startLoop();
        }
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) {
            startLoop();
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(canvasDiv.current);

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("visibilitychange", onVisibilityChange);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = (time: number) => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isDocumentVisible || !isCanvasVisible) return;
        if (time - lastFrameTime < 33) return;
        lastFrameTime = time;
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };

      const startLoop = () => {
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      startLoop();
      return () => {
        destroyed = true;
        progress.clear();
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        if (debounce) {
          clearTimeout(debounce);
        }
        characterRef.current = null;
        intersectionObserver.disconnect();
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
