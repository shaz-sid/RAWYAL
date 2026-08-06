import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Convert Latitude & Longitude to 3D Sphere Vector3
 */
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, radius * Math.cos(phi), z);
}

// Jaipur HQ Origin
const JAIPUR_ORIGIN = { lat: 26.9124, lon: 75.7873, name: 'Jaipur HQ' };

// Exactly 15 Perfectly Spaced 360° Destinations (1 for each 24° Compass Bearing around Jaipur)
const DESTINATIONS = [
  { name: 'Tashkent (North)', lat: 42.0, lon: 70.0 },
  { name: 'Almaty (North-Northeast)', lat: 44.0, lon: 82.0 },
  { name: 'Ulaanbaatar (Northeast)', lat: 47.9, lon: 106.9 },
  { name: 'Shanghai (East-Northeast)', lat: 31.23, lon: 121.47 },
  { name: 'Taipei (East)', lat: 25.03, lon: 121.56 },
  { name: 'Manila (East-Southeast)', lat: 14.6, lon: 121.0 },
  { name: 'Singapore (Southeast)', lat: 1.35, lon: 103.81 },
  { name: 'Jakarta (South-Southeast)', lat: -6.2, lon: 106.8 },
  { name: 'Perth (South)', lat: -31.95, lon: 115.86 },
  { name: 'Madagascar (South-Southwest)', lat: -18.9, lon: 47.5 },
  { name: 'Cape Town (Southwest)', lat: -33.92, lon: 18.42 },
  { name: 'Nairobi (West-Southwest)', lat: -1.29, lon: 36.82 },
  { name: 'Dubai (West)', lat: 25.2, lon: 55.27 },
  { name: 'Istanbul (West-Northwest)', lat: 41.0, lon: 28.97 },
  { name: 'London (Northwest)', lat: 51.5, lon: -0.12 },
];

export default function RotatingGlobe({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const aspect = width / height;
    const baseZ = 3.18;
    const initialZ = Math.max(baseZ, 3.8 / Math.min(aspect, 1.25));
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0, initialZ); // Prominent, centered globe view with full trajectory clearance

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ── Lighting ──
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(4, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x99aacc, 1.2);
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // ── Earth Mesh (Large radius = 0.98) ──
    const radius = 0.98;
    const earthGeometry = new THREE.SphereGeometry(radius, 64, 64);
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    const loader = new THREE.TextureLoader();
    loader.load('/earth-map.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      earthMaterial.map = tex;
      earthMaterial.needsUpdate = true;
      renderer.render(scene, camera);
    });

    loader.load('/earth-bump.png', (bump) => {
      earthMaterial.bumpMap = bump;
      earthMaterial.bumpScale = 0.03;
      earthMaterial.needsUpdate = true;
      renderer.render(scene, camera);
    });

    // ── Fixed Static Globe Orientation (Jaipur front & center) ──
    globeGroup.rotation.x = 0.42;
    globeGroup.rotation.y = -2.85;

    const jaipurPos = latLongToVector3(JAIPUR_ORIGIN.lat, JAIPUR_ORIGIN.lon, radius * 1.01);

    // Jaipur Pin Marker (Gold Dot)
    const pinGeom = new THREE.SphereGeometry(0.024, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xd4b87a });
    const jaipurPin = new THREE.Mesh(pinGeom, pinMat);
    jaipurPin.position.copy(jaipurPos);
    globeGroup.add(jaipurPin);

    // Darker / High Opacity Trajectory Line Material (0.58 opacity)
    const trajectoryMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4b87a,
      transparent: true,
      opacity: 0.58,
    });

    // Destination Pin Dot Material
    const destDotMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe8ab,
      transparent: true,
      opacity: 0.85,
    });

    const destDotGeom = new THREE.SphereGeometry(0.015, 12, 12);

    const geometriesToDispose = [earthGeometry, pinGeom, destDotGeom];
    const materialsToDispose = [earthMaterial, pinMat, trajectoryMaterial, destDotMaterial];

    // ── Build 15 Perfectly Spaced 360° Trajectories originating from Jaipur ──
    DESTINATIONS.forEach((dest, idx) => {
      const destPos = latLongToVector3(dest.lat, dest.lon, radius * 1.01);

      // Add destination pin dot
      const destDot = new THREE.Mesh(destDotGeom, destDotMaterial);
      destDot.position.copy(destPos);
      globeGroup.add(destDot);

      // Spherical midpoint calculation with high arch height
      const dist = jaipurPos.distanceTo(destPos);
      const midVector = new THREE.Vector3().addVectors(jaipurPos, destPos).normalize();
      
      const peakAltitudeMultiplier = 1.2 + Math.min(dist * 0.35, 0.46) + (idx % 4) * 0.025;
      const midPoint = midVector.multiplyScalar(radius * peakAltitudeMultiplier);

      const curve = new THREE.QuadraticBezierCurve3(jaipurPos, midPoint, destPos);
      const tubeGeom = new THREE.TubeGeometry(curve, 48, 0.0032, 6, false);
      geometriesToDispose.push(tubeGeom);

      const trajectoryMesh = new THREE.Mesh(tubeGeom, trajectoryMaterial);
      globeGroup.add(trajectoryMesh);
    });

    // Static Render Frame
    let frameId;
    function renderFrame() {
      renderer.render(scene, camera);
    }
    renderFrame();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const a = w / h;
      camera.aspect = a;
      camera.position.z = Math.max(baseZ, 3.8 / Math.min(a, 1.25));
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
