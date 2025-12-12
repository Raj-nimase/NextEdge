"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";

const cn = (...classes) => classes.filter(Boolean).join(' '); 

// Reduced distance for a subtler effect:
const animationDistance = 3; // Previously up to 10

// 1. Triangle Variants: Slides down from the Top
const triangleVariants = {
  normal: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 13 },
  },
  animate: {
    opacity: 1,
    // Reduced slide distance (e.g., from -10 to -3)
    y: [-animationDistance, 0], 
    x: 0,
    transition: { delay: 0.1, type: "spring", stiffness: 200, damping: 13 },
  },
};

// 2. Square Variants: Slides from the Bottom-Left
const squareVariants = {
  normal: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 13 },
  },
  animate: {
    opacity: 1,
    // Reduced slide distance (e.g., from 5 to 3)
    y: [animationDistance, 0],  
    x: [-animationDistance, 0], // Reduced slide distance (e.g., from -5 to -3)
    transition: { delay: 0.2, type: "spring", stiffness: 200, damping: 13 },
  },
};

// 3. Circle Variants: Slides from the Bottom-Right
const circleVariants = {
  normal: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 13 },
  },
  animate: {
    opacity: 1,
    // Reduced slide distance (e.g., from 5 to 3)
    y: [animationDistance, 0],  
    x: [animationDistance, 0],  // Reduced slide distance (e.g., from 5 to 3)
    transition: { delay: 0.3, type: "spring", stiffness: 200, damping: 13 },
  },
};

const ClubsIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none flex flex-col items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ overflow: 'visible' }}
        >
          {/* Motion Square: Slides from Left */}
          <motion.rect 
            x="3" y="11" width="10" height="10" rx="1" 
            variants={squareVariants}
            animate={controls}
          />
          
          {/* Motion Circle: Slides from Right */}
          <motion.circle 
            cx="17.5" cy="17.5" r="3.5" 
            variants={circleVariants}
            animate={controls}
          />
          
          {/* Motion Triangle: Slides from Top */}
          <motion.path
            d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
            variants={triangleVariants}
            animate={controls}
          />
        </svg>
        {props.title && <div className="mt-1">{props.title}</div>}
      </div>
    );
  }
);

ClubsIcon.displayName = "ClubsIcon";

export { ClubsIcon };