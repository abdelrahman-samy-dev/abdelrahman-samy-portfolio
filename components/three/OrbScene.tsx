"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Group } from "three";

const AMBER = "#e9a23b";

function Orb({ still }: { still: boolean }) {
  const group = useRef<Group>(null);

  // Ease toward the pointer for a subtle parallax tilt
  useFrame((state, delta) => {
    const g = group.current;
    if (!g || still) return;
    g.rotation.y += (state.pointer.x * 0.5 - g.rotation.y) * Math.min(1, delta * 2);
    g.rotation.x += (-state.pointer.y * 0.35 - g.rotation.x) * Math.min(1, delta * 2);
  });

  return (
    <group ref={group}>
      <Float speed={still ? 0 : 1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        {/* Molten amber core */}
        <mesh>
          <icosahedronGeometry args={[1.15, 32]} />
          <MeshDistortMaterial
            color={AMBER}
            roughness={0.18}
            metalness={0.55}
            distort={still ? 0.2 : 0.38}
            speed={still ? 0 : 1.6}
          />
        </mesh>
        {/* Orbit rings */}
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.85, 0.008, 16, 160]} />
          <meshBasicMaterial color={AMBER} transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, -0.5, 0.3]}>
          <torusGeometry args={[2.15, 0.005, 16, 160]} />
          <meshBasicMaterial color="#f6d08f" transparent opacity={0.3} />
        </mesh>
        {/* Wireframe shell */}
        <mesh scale={1.42}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#f3f1ec" wireframe transparent opacity={0.06} />
        </mesh>
      </Float>
    </group>
  );
}

export default function OrbScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={still ? "demand" : "always"}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff6e8" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#ffb347" />
      <pointLight position={[3, -3, -2]} intensity={8} color="#ffffff" />
      <Orb still={still} />
    </Canvas>
  );
}
