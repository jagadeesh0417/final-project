"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Thin-film iridescence, approximated.
 *
 * The colour is driven by the Fresnel term — how obliquely you are looking at
 * the surface — pushed through a four-stop spectral ramp. Edges catch aqua and
 * iris, faces sit closer to amber, and the whole film drifts over time. It is
 * the same idea as oil on water, and it is what makes the geometry read as
 * something other than a shaded box.
 */
const IridescentMaterial = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 1,
    uBands: 2.4,
    uColorA: new THREE.Color("#f0b23f"),
    uColorB: new THREE.Color("#ff6a8d"),
    uColorC: new THREE.Color("#9a85ff"),
    uColorD: new THREE.Color("#46e0d0"),
  },
  /* glsl */ `
    varying vec3 vNormalW;
    varying vec3 vViewW;
    varying float vHeight;

    void main() {
      vec4 world = modelMatrix * vec4(position, 1.0);
      vNormalW = normalize(mat3(modelMatrix) * normal);
      vViewW = normalize(cameraPosition - world.xyz);
      vHeight = position.y;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform float uIntensity;
    uniform float uBands;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;

    varying vec3 vNormalW;
    varying vec3 vViewW;
    varying float vHeight;

    vec3 ramp(float t) {
      t = fract(t);
      if (t < 0.3333) return mix(uColorA, uColorB, t / 0.3333);
      if (t < 0.6666) return mix(uColorB, uColorC, (t - 0.3333) / 0.3333);
      return mix(uColorC, uColorD, (t - 0.6666) / 0.3334);
    }

    void main() {
      vec3 n = normalize(vNormalW);
      vec3 v = normalize(vViewW);

      // Fresnel: 0 head-on, 1 at grazing angles.
      float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.6);

      // Film thickness varies with height and drifts, so the bands travel.
      float thickness = fresnel * uBands + vHeight * 0.08 + uTime * 0.045;
      vec3 film = ramp(thickness);

      // A cool key from above keeps the faces from going flat.
      float key = clamp(dot(n, normalize(vec3(0.4, 1.0, 0.3))), 0.0, 1.0);

      vec3 base = vec3(0.055, 0.04, 0.09);
      vec3 col = base + film * (fresnel * 1.5 + 0.16) * uIntensity + key * 0.09;

      gl_FragColor = vec4(col, 1.0);
      #include <colorspace_fragment>
    }
  `
);

extend({ IridescentMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    iridescentMaterial: ThreeElement<typeof IridescentMaterial>;
  }
}

export function useIridescent(intensity = 1, bands = 2.4) {
  const ref = useRef<THREE.ShaderMaterial & { uTime: number }>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.uTime += delta;
  });
  return { ref, intensity, bands };
}

export default IridescentMaterial;
