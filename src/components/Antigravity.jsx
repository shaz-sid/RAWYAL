import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
  count = 220,
  magnetRadius = 8,
  ringRadius = 4.5,
  waveSpeed = 0.6,
  waveAmplitude = 0.8,
  particleSize = 0.35,
  lerpSpeed = 0.04,
  color = '#d4b87a',
  autoAnimate = true,
  particleVariance = 0.9,
  rotationSpeed = 0.02,
  depthFactor = 0.8,
  pulseSpeed = 4,
  particleShape = 'sphere',
  fieldStrength = 12
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 150;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 15;

      const randomRadiusOffset = (Math.random() - 0.5) * 1.5;

      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;

    const mouseDist = Math.sqrt(Math.pow(m.x - lastMousePos.current.x, 2) + Math.pow(m.y - lastMousePos.current.y, 2));

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2500) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.4) * (v.width / 5);
      destY = Math.cos(time * 0.4 * 2) * (v.height / 5);
    }

    const smoothFactor = 0.04;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      t = particle.t += speed / 2;

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetPos = { x: mx, y: my, z: mz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;

        const wave = Math.sin(t * waveSpeed + angle) * (0.4 * waveAmplitude);
        const deviation = randomRadiusOffset * (4 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * depthFactor + Math.sin(t) * (0.8 * waveAmplitude * depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);

      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      );

      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = 1 - distFromRing / 8;

      scaleFactor = Math.max(0.1, Math.min(1, scaleFactor));

      // Twinkle pulsation for sparkly stardust feel
      const twinkle = 0.7 + Math.sin(t * pulseSpeed + i) * 0.3 * particleVariance;
      const finalScale = scaleFactor * twinkle * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.04, 0.15, 4, 6]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.07, 8, 8]} />}
      {particleShape === 'box' && <boxGeometry args={[0.08, 0.08, 0.08]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.08]} />}
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </instancedMesh>
  );
};

const Antigravity = props => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }} style={{ pointerEvents: 'none' }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;
