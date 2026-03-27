import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Character } from "./Character";
import { Particle } from "./Particle";
import { PASTEL_PALETTE } from "../colors";

const PARTICLE_COUNT = 24;

interface ParticleData {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  delay: number;
}

export const TheGathering: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const particles = useMemo<ParticleData[]>(() => {
    const result: ParticleData[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const radius = 600 + Math.random() * 300;
      const centerX = width / 2;
      const centerY = height / 2;

      // Target near the character's hands area
      const isLeftHand = i % 2 === 0;
      const handX = isLeftHand ? centerX - 135 : centerX + 135;
      const handY = centerY + 15;

      result.push({
        id: i,
        startX: centerX + Math.cos(angle) * radius,
        startY: centerY + Math.sin(angle) * radius,
        targetX: handX + (Math.random() - 0.5) * 40,
        targetY: handY + (Math.random() - 0.5) * 30,
        size: 6 + Math.random() * 10,
        color: PASTEL_PALETTE[i % PASTEL_PALETTE.length],
        delay: i * 1.5,
      });
    }
    return result;
  }, [width, height]);

  const glowIntensity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const characterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out character and remaining particles as Launch sequence takes over
  const fadeOut = interpolate(frame, [55, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div style={{ opacity: fadeOut }}>
        <Character
          opacity={characterOpacity}
          glowIntensity={glowIntensity}
        />
      </div>

      {particles.map((p) => {
        const progress = spring({
          frame: frame - p.delay,
          fps,
          config: {
            damping: 14,
            stiffness: 40,
            mass: 0.8,
          },
        });

        const x = interpolate(progress, [0, 1], [p.startX, p.targetX]);
        const y = interpolate(progress, [0, 1], [p.startY, p.targetY]);

        const particleOpacity = interpolate(
          frame,
          [p.delay, p.delay + 5, 55, 65],
          [0, 0.8, 0.8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Particle
            key={p.id}
            x={x}
            y={y}
            size={p.size}
            color={p.color}
            opacity={particleOpacity * fadeOut}
          />
        );
      })}
    </AbsoluteFill>
  );
};
