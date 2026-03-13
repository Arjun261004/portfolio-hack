import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TerminalWindow } from './TerminalWindow';

export const Macbook3D = () => {
  const group = useRef<THREE.Group>(null);

  // M3 Macbook Pro Dimensions (approx 16:10 aspect ratios)
  const caseWidth = 14;
  const caseDepth = 9.5;
  const caseHeight = 0.35;
  
  // Space Black Aluminum Material
  const aluminumMaterial = new THREE.MeshStandardMaterial({
    color: '#18181a',
    roughness: 0.25,
    metalness: 0.9,
  });

  // Trackpad Material
  const trackpadMaterial = new THREE.MeshStandardMaterial({
    color: '#101012',
    roughness: 0.4,
    metalness: 0.8,
  });

  return (
    <group ref={group} position={[0, -2, 0]} rotation={[0.2, 0, 0]}>
      {/* --- BOTTOM CASE --- */}
      <group position={[0, caseHeight / 2, 0]}>
        {/* Main Body */}
        <mesh material={aluminumMaterial} castShadow receiveShadow>
          <boxGeometry args={[caseWidth, caseHeight, caseDepth]} />
        </mesh>
        
        {/* Trackpad Recess */}
        <mesh position={[0, caseHeight / 2 + 0.01, 2]} material={trackpadMaterial}>
          <boxGeometry args={[5, 0.01, 3.5]} />
        </mesh>

        {/* Keyboard Well */}
        <mesh position={[0, caseHeight / 2 + 0.01, -1.8]} material={new THREE.MeshStandardMaterial({ color: '#050505' })}>
          <boxGeometry args={[12, 0.02, 4.5]} />
        </mesh>
        
        {/* Keyboard (Procedural Grid) */}
        <group position={[-5.5, caseHeight / 2 + 0.04, -3.7]}>
          {Array.from({ length: 6 }).map((_, row) => 
            Array.from({ length: 14 }).map((_, col) => {
               // Make bottom row keycaps slightly taller
               const isSpacebarRow = row === 5;
               const isSpacebar = isSpacebarRow && col > 3 && col < 9;
               
               // Skip rendering elements that fall inside the spacebar width to make it one long key
               if (isSpacebarRow && col > 4 && col < 9) return null;
               
               const keyWidth = isSpacebar ? 4.1 : 0.7;
               const offset = isSpacebar ? 1.7 : 0;
               
               return (
                  <mesh 
                    key={`${row}-${col}`} 
                    position={[col * 0.85 + offset, 0, row * 0.8]}
                    material={new THREE.MeshStandardMaterial({ color: '#0a0a0c', roughness: 0.6 })}
                  >
                    <boxGeometry args={[keyWidth, 0.05, 0.7]} />
                  </mesh>
               );
            })
          )}
        </group>
      </group>

      {/* --- DISPLAY ASSEMBLY (Hinged at the back) --- */}
      {/* Positioned at the very back edge (Z: -caseDepth / 2) */}
      <group position={[0, caseHeight + 0.05, -caseDepth / 2]}>
        {/* Rotate 105 degrees backward around the hinge */}
        <group rotation={[-105 * (Math.PI / 180), 0, 0]}>
          {/* Shift display up by half its height so the bottom is at the hinge */}
          <group position={[0, caseDepth / 2, 0]}>
            {/* Display Lid / Back Cover */}
            <mesh material={aluminumMaterial} castShadow>
              <boxGeometry args={[caseWidth, caseDepth, 0.15]} />
            </mesh>

            {/* Glossy Black Screen Bezel */}
            <mesh position={[0, 0, 0.08]} material={new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.2 })}>
              <planeGeometry args={[caseWidth - 0.1, caseDepth - 0.1]} />
            </mesh>
            
            {/* Notch */}
            <mesh position={[0, caseDepth / 2 - 0.25, 0.09]} material={new THREE.MeshStandardMaterial({ color: '#020202' })}>
               <planeGeometry args={[2, 0.4]} />
            </mesh>

            {/* Embedded Terminal UI (Html projection) */}
            {/* We will scale this down significantly so `TerminalWindow` fits on the screen naturally */}
            <Html
              transform
              position={[0, -0.2, 0.1]} // slightly offset from the bezel
              distanceFactor={1.5}       // controls relative scale factoring
              scale={0.015}              // downscale heavily to fit standard DOM into 3D units
              center                     // centers the HTML anchor
              className="pointer-events-auto" // allow interacting if needed
            >
               {/* Note: The TerminalWindow will manage its own scroll listeners as long as it mounts */}
               <TerminalWindow isEmbedded={true} />
            </Html>
          </group>
        </group>
      </group>
    </group>
  );
};
