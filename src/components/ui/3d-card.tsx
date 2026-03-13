"use client";

import { cn } from "../../lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  maxRotateX = 15,
  maxRotateY = 15,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxRotateX?: number;
  maxRotateY?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics-based smoothing - Increased stiffness and decreased damping for more "reactive" feel
  const springConfig = { stiffness: 250, damping: 15 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform rotation values
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotateY, maxRotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates to [-0.5, 0.5]
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={cn(
          "flex items-center justify-center w-full relative",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={containerRef}
          style={{
            rotateX: isMouseEnter ? rotateX : 0,
            rotateY: isMouseEnter ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "flex items-center justify-center relative w-full h-full",
            className
          )}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-auto w-auto [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = motion.div,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const [isMouseEnter] = useMouseEnter();

  return (
    <Tag
      animate={{
        x: isMouseEnter ? translateX : 0,
        y: isMouseEnter ? translateY : 0,
        z: isMouseEnter ? translateZ : 0,
        rotateX: isMouseEnter ? rotateX : 0,
        rotateY: isMouseEnter ? rotateY : 0,
        rotateZ: isMouseEnter ? rotateZ : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className={cn("transition-all duration-200", className)}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
};
