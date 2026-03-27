import React from "react";

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export const Particle: React.FC<ParticleProps> = ({
  x,
  y,
  size,
  color,
  opacity,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        transform: "translate(-50%, -50%)",
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};
