import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   EarthGlobe — Realistic Three.js Earth with NASA Blue Marble
   ═══════════════════════════════════════════════════════════════ */

export default function EarthGlobe({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width  = container.clientWidth  || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const aspect = width / height;
    const baseZ = 2.8;
    const initialZ = aspect < 1 ? baseZ / (aspect * 0.98) : baseZ;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0, initialZ);

    // ── Load textures ──
    const loader = new THREE.TextureLoader();
    const earthMap = loader.load('/earth-map.jpg');
    const bumpMap  = loader.load('/earth-bump.png');

    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // ── Earth mesh ──
    const earthGeom = new THREE.SphereGeometry(1, 64, 64);
    const earthMat  = new THREE.MeshStandardMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: 0.03,
      roughness: 0.85,
      metalness: 0.05,
    });
    const earth = new THREE.Mesh(earthGeom, earthMat);
    earth.rotation.y = -Math.PI * 0.3;
    scene.add(earth);

    // ── Lighting — bright and natural ──
    // Key light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Fill light (softer, from opposite side)
    const fillLight = new THREE.DirectionalLight(0x8899cc, 0.8);
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    // Ambient (so shadow side isn't pitch black)
    const ambient = new THREE.AmbientLight(0x334466, 1.0);
    scene.add(ambient);

    // ── Animation ──
    let frameId;
    const startY = earth.rotation.y;
    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      earth.rotation.y = startY + clock.getElapsedTime() * 0.06;
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ──
    const onResize = () => {
      const w = container.clientWidth  || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const a = w / h;
      camera.aspect = a;
      camera.position.z = a < 1 ? baseZ / (a * 0.98) : baseZ;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      earthGeom.dispose();
      earthMat.dispose();
      earthMap.dispose();
      bumpMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
    />
  );
}
