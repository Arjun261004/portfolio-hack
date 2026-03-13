import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrthographicCamera } from '@react-three/drei';
import { useScroll, motion, useTransform } from 'framer-motion';
import { Macbook3D } from './Macbook3D';

export const Hero3DWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out the entire 3D hero scene at the very end of the scroll (when terminal is done)
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <motion.div 
        style={{ opacity }}
        className="sticky top-0 w-full h-screen overflow-hidden bg-black"
      >
        <Canvas>
          {/* Use Orthographic for that flat, architectural/blueprint look */}
          <OrthographicCamera 
            makeDefault 
            position={[0, 2, 25]} 
            zoom={40} 
            near={0.1} 
            far={1000} 
          />
          
          <ambientLight intensity={0.5} />
          
          {/* Key Light */}
          <directionalLight 
             position={[10, 10, 5]} 
             intensity={1} 
             castShadow 
          />
          {/* Fill Light */}
          <directionalLight 
             position={[-10, 5, 5]} 
             intensity={0.5} 
          />
          {/* Rim Light */}
          <spotLight 
             position={[0, 10, -10]} 
             intensity={2} 
             angle={0.5} 
             penumbra={1} 
             color="#00ff41"
          />

          <Environment preset="city" />
          
          <Macbook3D />
        </Canvas>
      </motion.div>
    </div>
  );
};
