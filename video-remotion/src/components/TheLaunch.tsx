import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../colors";

const TRAIL_COUNT = 8;

export const TheLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const centerX = width / 2;
  const centerY = height / 2;

  // Phase 1: coalescence (frames 0-20 of this sequence)
  const coalesce = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.5 },
  });

  // Phase 2: pulse (frames 20-30)
  const pulseScale = interpolate(frame, [18, 24, 28], [1, 1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: launch forward (frames 28-60) — orb grows simulating approaching camera
  const launchProgress = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 18, stiffness: 30, mass: 1.2 },
  });

  const orbScale = interpolate(
    frame,
    [0, 18, 28, 60],
    [0.1, 0.6, 0.6, 4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const orbOpacity = interpolate(frame, [0, 8, 55, 65], [0, 1, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Character fades as orb forms
  const charFade = interpolate(frame, [15, 35], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orb base size
  const orbSize = 80;

  // Motion trails for speed effect
  const trails = useMemo(() => {
    return Array.from({ length: TRAIL_COUNT }, (_, i) => ({
      id: i,
      offsetFrame: i * 2,
      scale: 1 - i * 0.08,
      opacity: 0.3 - i * 0.035,
    }));
  }, []);

  const showTrails = frame > 30;

  return (
    <AbsoluteFill>
      {/* Fading character silhouette */}
      {charFade > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: charFade,
          }}
        >
          <svg width="200" height="340" viewBox="0 0 200 340" fill="none">
            <circle cx="100" cy="50" r="35" fill={COLORS.purple} />
            <path
              d="M70 95 L130 95 L140 220 Q140 230 130 230 L70 230 Q60 230 60 220 Z"
              fill={COLORS.purple}
            />
            <path d="M70 110 Q30 130 25 170 Q22 185 35 185" stroke={COLORS.purple} strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M130 110 Q170 130 175 170 Q178 185 165 185" stroke={COLORS.purple} strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M80 230 L75 310 Q74 320 80 320 L95 320" stroke={COLORS.purple} strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M120 230 L125 310 Q126 320 120 320 L105 320" stroke={COLORS.purple} strokeWidth="16" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}

      {/* Motion trails */}
      {showTrails &&
        trails.map((trail) => {
          const trailScale = interpolate(
            frame - trail.offsetFrame,
            [28, 60],
            [0.6, 4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={trail.id}
              style={{
                position: "absolute",
                left: centerX - orbSize / 2,
                top: centerY - orbSize / 2,
                width: orbSize,
                height: orbSize,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(255,255,255,${trail.opacity}) 0%, ${COLORS.lavender}33 60%, transparent 100%)`,
                transform: `scale(${trailScale * trail.scale})`,
                opacity: trail.opacity * orbOpacity,
              }}
            />
          );
        })}

      {/* Main orb */}
      <div
        style={{
          position: "absolute",
          left: centerX - orbSize / 2,
          top: centerY - orbSize / 2,
          width: orbSize,
          height: orbSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.white} 0%, ${COLORS.lavender} 50%, ${COLORS.purple}88 100%)`,
          transform: `scale(${orbScale * pulseScale})`,
          opacity: orbOpacity,
          boxShadow: `0 0 ${60 * orbScale}px ${COLORS.lavender}, 0 0 ${120 * orbScale}px ${COLORS.purple}66`,
        }}
      />
    </AbsoluteFill>
  );
};
