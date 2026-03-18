import { forwardRef, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function Robot() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const purpleMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1a2e", metalness: 0.8, roughness: 0.3 }),
    []
  );
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0d0d1a", metalness: 0.9, roughness: 0.2 }),
    []
  );
  const eyeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff2d55",
        emissive: "#ff2d55",
        emissiveIntensity: 2,
      }),
    []
  );

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003;
      const targetX = pointer.x * 0.3;
      const targetY = pointer.y * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetY, 0.05);
      group.current.rotation.y += targetX * 0.01;
    }
    if (eyeMat) {
      eyeMat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      <mesh position={[0, 1.6, 0]} material={purpleMat}>
        <boxGeometry args={[1.2, 1, 1]} />
      </mesh>
      <mesh position={[-0.3, 1.7, 0.51]} material={eyeMat}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      <mesh position={[0.3, 1.7, 0.51]} material={eyeMat}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      <mesh position={[0, 1.65, 0.51]}>
        <boxGeometry args={[0.9, 0.2, 0.05]} />
        <meshStandardMaterial color="#2a0845" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.55, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={darkMat}>
        <boxGeometry args={[1.4, 1.2, 0.8]} />
      </mesh>
      <mesh position={[0, 0.6, 0.41]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.3} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1, 0.5, 0]} material={purpleMat}>
        <boxGeometry args={[0.4, 1, 0.4]} />
      </mesh>
      <mesh position={[1, 0.5, 0]} material={purpleMat}>
        <boxGeometry args={[0.4, 1, 0.4]} />
      </mesh>
      <mesh position={[-0.35, -0.6, 0]} material={darkMat}>
        <boxGeometry args={[0.45, 1, 0.5]} />
      </mesh>
      <mesh position={[0.35, -0.6, 0]} material={darkMat}>
        <boxGeometry args={[0.45, 1, 0.5]} />
      </mesh>
    </group>
  );
}

const Pedestal = forwardRef<THREE.Mesh>((_props, ref) => (
  <mesh ref={ref} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
  </mesh>
));
Pedestal.displayName = "Pedestal";

const ReflectionPlane = forwardRef<THREE.Mesh>((_props, ref) => (
  <mesh ref={ref} position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[10, 10]} />
    <MeshReflectorMaterial
      mirror={0.3}
      blur={[300, 100]}
      resolution={512}
      mixBlur={1}
      mixStrength={0.5}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#050505"
      metalness={0.5}
    />
  </mesh>
));
ReflectionPlane.displayName = "ReflectionPlane";

const FloatingTextBlock = forwardRef<THREE.Group, { position: [number, number, number] }>(
  ({ position }, ref) => (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh position={position}>
          <boxGeometry args={[1.5, 0.5, 0.05]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  )
);
FloatingTextBlock.displayName = "FloatingTextBlock";

const RobotScene = () => {
  return (
    <div className="w-full h-full" style={{ touchAction: "pan-y" }}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[-3, 3, 2]} intensity={40} color="#7C3AED" />
        <pointLight position={[3, 2, 3]} intensity={30} color="#A855F7" />
        <pointLight position={[0, 4, 0]} intensity={15} color="#ffffff" />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={20} color="#7C3AED" />
        <Robot />
        <Pedestal />
        <ReflectionPlane />
        <FloatingTextBlock position={[-2.5, 1.2, 0]} />
        <FloatingTextBlock position={[2.5, 1.2, 0]} />
        <fog attach="fog" args={["#000000", 5, 15]} />
      </Canvas>
    </div>
  );
};

export default RobotScene;
