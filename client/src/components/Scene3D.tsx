import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere, Box } from "@react-three/drei";
import { Suspense } from "react";

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-1, 1, 0]}>
          <MeshDistortMaterial
            color="#2563eb"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={1.5} floatIntensity={0.5}>
        <Box args={[0.8, 0.8, 0.8]} position={[1.5, -0.5, 0.5]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#10b981" roughness={0.1} metalness={0.1} />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[0.4]} position={[1.2, 1.8, -1]}>
          <meshStandardMaterial color="#f59e0b" roughness={0.2} />
        </Sphere>
      </Float>
    </>
  );
}

function GraphMesh() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[0.5, 0.5, 0]} scale={2}>
        {/* Simple bar chart metaphor */}
        <Box args={[0.2, 1, 0.2]} position={[-0.4, 0, 0]}>
           <meshStandardMaterial color="#2563eb" transparent opacity={0.6} />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[0, 0.25, 0]}>
           <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
        </Box>
        <Box args={[0.2, 0.8, 0.2]} position={[0.4, -0.1, 0]}>
           <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} />
        </Box>
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function FeatureScene() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none hidden lg:block opacity-20">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <GraphMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
