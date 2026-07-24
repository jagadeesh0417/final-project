"use client";

import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import "./IridescentMaterial";

/** Prism cluster: [x, z, height, width, rotation] */
const PRISMS: Array<[number, number, number, number, number]> = [
  [-3.5, -1.2, 5.4, 0.85, 0.3],
  [-1.9, 1.4, 3.2, 0.7, -0.5],
  [1.8, -2.0, 6.6, 0.95, 0.8],
  [3.4, 1.1, 4.1, 0.75, -0.2],
  [0.2, 3.2, 2.6, 0.6, 1.1],
  [-4.6, 2.4, 2.2, 0.55, 0.6],
  [4.8, -0.6, 3.0, 0.62, -0.9],
];

function Prism({ spec, index }: { spec: (typeof PRISMS)[number]; index: number }) {
  const [x, z, h, w, rot] = spec;
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial & { uTime: number }>(null);

  useFrame((state, delta) => {
    if (mat.current) mat.current.uTime += delta;
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = h / 2 + Math.sin(t * 0.5 + index * 1.3) * 0.09;
      ref.current.rotation.y = rot + t * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[x, h / 2, z]} castShadow>
      <boxGeometry args={[w, h, w]} />
      <iridescentMaterial ref={mat} uIntensity={1.15} uBands={2.2 + index * 0.12} />
    </mesh>
  );
}

/** The centrepiece: real refraction, so it picks up the prisms behind it. */
function Monolith() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.14;
    ref.current.position.y = 4.3 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.14;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.4}>
      <mesh ref={ref} position={[0, 4.3, 0]} castShadow>
        <octahedronGeometry args={[1.9, 0]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          thickness={1.4}
          roughness={0.06}
          anisotropy={0.4}
          chromaticAberration={0.42}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.12}
          ior={1.7}
          color="#f4effa"
          attenuationColor="#9a85ff"
          attenuationDistance={2.4}
        />
      </mesh>
    </Float>
  );
}

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ camera }, delta) => {
    const onMove = pointer.current;
    const targetX = 9 + onMove.x * 1.6 + progress.current * 2.4;
    const targetY = 5.2 - onMove.y * 1.1 + progress.current * 3.2;
    const targetZ = 11 - progress.current * 3.6;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.4, delta);
    camera.lookAt(0, 2.4 - progress.current * 1.2, 0);
  });

  useMemo(() => {
    if (typeof window === "undefined") return;
    const move = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", move, { passive: true });
  }, []);

  return null;
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[70, 70]} />
      <meshStandardMaterial color="#0a0714" roughness={0.34} metalness={0.85} envMapIntensity={0.7} />
    </mesh>
  );
}

export default function CrystalScene({
  progress,
  quality = "high",
}: {
  progress: React.MutableRefObject<number>;
  quality?: "high" | "low";
}) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.8] : [1, 1.2]}
      shadows={quality === "high"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [9, 5.2, 11], fov: 36 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#08060e", 0.032);
      }}
    >
      <color attach="background" args={["#08060e"]} />

      <ambientLight intensity={0.35} color="#9a85ff" />
      <directionalLight
        position={[6, 14, 5]}
        intensity={2.1}
        color="#f4effa"
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-8, 3, -6]} intensity={70} color="#9a85ff" distance={26} decay={2} />
      <pointLight position={[7, 2, 7]} intensity={50} color="#f0b23f" distance={22} decay={2} />
      <pointLight position={[0, 9, -9]} intensity={40} color="#46e0d0" distance={26} decay={2} />

      {/* Built in-scene, so no HDRI is fetched at runtime. */}
      <Environment resolution={192}>
        <Lightformer form="rect" intensity={2.4} color="#9a85ff" position={[-6, 6, -6]} scale={[10, 10, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#f0b23f" position={[6, 4, 6]} scale={[8, 8, 1]} />
        <Lightformer form="ring" intensity={1.4} color="#46e0d0" position={[0, 10, 0]} scale={[6, 6, 1]} />
      </Environment>

      <Rig progress={progress} />
      <Ground />
      <Monolith />
      {PRISMS.map((spec, i) => (
        <Prism key={i} spec={spec} index={i} />
      ))}

      {quality === "high" ? (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.9} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
          <ChromaticAberration
            offset={[0.0007, 0.0009]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.22} darkness={0.72} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
