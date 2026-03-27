import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../colors";

export const TheApproach: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const centerX = width / 2;
  const centerY = height / 2;

  // Orb keeps growing, filling the screen
  const orbScale = interpolate(frame, [0, 45, 55, 60], [3.5, 12, 14, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orbOpacity = interpolate(frame, [0, 10, 50, 60], [0.9, 1, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera shake — subtle oscillation
  const shakeIntensity = interpolate(frame, [10, 30, 50], [0, 8, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.3) * shakeIntensity;
  const shakeY = Math.cos(frame * 1.7) * shakeIntensity;

  // Background blur effect
  const bgBlur = interpolate(frame, [10, 45], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dramatic pause / slow-motion feel at frame ~45 (frame 165 globally)
  const dramaticGlow = interpolate(
    frame,
    [40, 45, 50],
    [1, 2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const orbSize = 80;

  // White flash at the end of approach
  const flashOpacity = interpolate(frame, [52, 58, 62], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Blurred background overlay */}
      <AbsoluteFill
        style={{
          backdropFilter: `blur(${bgBlur}px)`,
        }}
      />

      {/* Radial light streaks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const streakOpacity = interpolate(frame, [15, 35], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const streakLength = interpolate(frame, [15, 50], [100, 600], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: centerX,
              top: centerY,
              width: 3,
              height: streakLength,
              background: `linear-gradient(to bottom, ${COLORS.lavender}, transparent)`,
              transform: `rotate(${angle}rad) translateY(-${streakLength / 2}px)`,
              transformOrigin: "0 0",
              opacity: streakOpacity,
            }}
          />
        );
      })}

      {/* Main orb — enormous */}
      <div
        style={{
          position: "absolute",
          left: centerX - orbSize / 2,
          top: centerY - orbSize / 2,
          width: orbSize,
          height: orbSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.white} 0%, ${COLORS.lavender} 40%, ${COLORS.purple}66 80%, transparent 100%)`,
          transform: `scale(${orbScale})`,
          opacity: orbOpacity,
          boxShadow: `0 0 ${100 * dramaticGlow}px ${COLORS.lavender}, 0 0 ${200 * dramaticGlow}px ${COLORS.purple}44`,
        }}
      />

      {/* White flash */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.white,
          opacity: flashOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
