import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function CyberScene() {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Mesh>(null);

  // Rain particles
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 40 - 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  const rainMaterial = useMemo(() => new THREE.PointsMaterial({
    color: '#0ff0fc',
    size: 0.05,
    transparent: true,
    opacity: 0.6,
  }), []);

  const rainGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const rainRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        // Fall down
        positions[i * 3 + 1] -= 20 * delta;
        
        // Reset if too low
        if (positions[i * 3 + 1] < -20) {
          positions[i * 3 + 1] = 20;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#0ff0fc" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#b026ff" />

      {/* Rain particles */}
      <points ref={rainRef} geometry={rainGeometry} material={rainMaterial} />
      
      {/* Floating Sparkles around monitor */}
      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.2} color="#00ff41" />

      {/* Abstract Desk/Structure */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Main Screen (Monitor) */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, 0, -3]}>
          {/* Monitor bezel */}
          <mesh>
            <boxGeometry args={[8.4, 4.8, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.5} />
          </mesh>
          {/* Monitor Screen Setup */}
          <mesh ref={monitorRef} position={[0, 0, 0.11]}>
            <planeGeometry args={[8, 4.4]} />
            <meshBasicMaterial color="#020202" />
          </mesh>
          {/* Screen Glow */}
          <pointLight position={[0, 0, 1]} intensity={2} color="#00ff41" distance={10} decay={2} />
          
          {/* Side Panels */}
          <mesh position={[-5, 0, -1]} rotation={[0, Math.PI / 6, 0]}>
            <boxGeometry args={[4.2, 7.8, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.5} />
            <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#b026ff" distance={5} />
          </mesh>
          <mesh position={[5, 0, -1]} rotation={[0, -Math.PI / 6, 0]}>
            <boxGeometry args={[4.2, 7.8, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.5} />
            <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#0ff0fc" distance={5} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
