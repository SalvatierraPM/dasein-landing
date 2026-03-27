import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS, PASTEL_PALETTE } from "../colors";

interface Shard {
  id: number;
  angle: number;
  distance: number;
  rotation: number;
  size: number;
  color: string;
}

interface NodeData {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
  delay: number;
}

const NODE_LABELS = ["Senales", "Escenarios", "Stakeholders", "Decisiones"];

export const ThePortal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const centerX = width / 2;
  const centerY = height / 2;

  // Shards — orb fracturing outward
  const shards = useMemo<Shard[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * Math.PI * 2 + Math.random() * 0.3,
      distance: 200 + Math.random() * 400,
      rotation: Math.random() * 360,
      size: 30 + Math.random() * 50,
      color: PASTEL_PALETTE[i % PASTEL_PALETTE.length],
    }));
  }, []);

  // Nodes in the new world
  const nodes = useMemo<NodeData[]>(() => {
    const positions = [
      { x: centerX - 350, y: centerY - 180 },
      { x: centerX + 320, y: centerY - 140 },
      { x: centerX - 280, y: centerY + 200 },
      { x: centerX + 380, y: centerY + 180 },
    ];
    return NODE_LABELS.map((label, i) => ({
      id: i,
      x: positions[i].x,
      y: positions[i].y,
      label,
      color: PASTEL_PALETTE[i],
      delay: 15 + i * 5,
    }));
  }, [centerX, centerY]);

  // Shard explosion progress
  const shardProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60, mass: 0.6 },
  });

  // Shard fade out
  const shardOpacity = interpolate(frame, [10, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center orb — shrinks as it fractures
  const orbScale = interpolate(frame, [0, 15], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orbOpacity = interpolate(frame, [0, 12], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connection lines between nodes
  const connectionOpacity = interpolate(frame, [30, 45], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle floating offset for nodes
  const floatOffset = Math.sin(frame * 0.08) * 6;

  return (
    <AbsoluteFill>
      {/* Residual orb */}
      {orbOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: centerX - 40,
            top: centerY - 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.white} 0%, ${COLORS.lavender} 50%, transparent 100%)`,
            transform: `scale(${orbScale})`,
            opacity: orbOpacity,
          }}
        />
      )}

      {/* Fracturing shards */}
      {shards.map((shard) => {
        const dx = Math.cos(shard.angle) * shard.distance * shardProgress;
        const dy = Math.sin(shard.angle) * shard.distance * shardProgress;
        const rot = shard.rotation * shardProgress;

        return (
          <div
            key={shard.id}
            style={{
              position: "absolute",
              left: centerX + dx - shard.size / 2,
              top: centerY + dy - shard.size / 2,
              width: shard.size,
              height: shard.size,
              backgroundColor: shard.color,
              opacity: shardOpacity,
              transform: `rotate(${rot}deg)`,
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            }}
          />
        );
      })}

      {/* Connection lines (SVG) */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: connectionOpacity,
        }}
      >
        {nodes.map((nodeA, i) =>
          nodes
            .filter((_, j) => j > i)
            .map((nodeB) => (
              <line
                key={`${nodeA.id}-${nodeB.id}`}
                x1={nodeA.x}
                y1={nodeA.y + floatOffset}
                x2={nodeB.x}
                y2={nodeB.y + floatOffset}
                stroke={COLORS.lavender}
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
            ))
        )}
      </svg>

      {/* Data nodes */}
      {nodes.map((node) => {
        const nodeSpring = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          config: { damping: 12, stiffness: 50, mass: 0.7 },
        });

        const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeY = node.y + floatOffset;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: nodeY,
              transform: `translate(-50%, -50%) scale(${nodeScale})`,
              opacity: nodeOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Node circle */}
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: node.color,
                boxShadow: `0 0 30px ${node.color}88, 0 0 60px ${node.color}44`,
                border: `2px solid ${COLORS.white}44`,
              }}
            />
            {/* Node label */}
            <div
              style={{
                color: COLORS.periwinkle,
                fontSize: 22,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 600,
                letterSpacing: "0.05em",
                textShadow: `0 0 20px ${node.color}66`,
                whiteSpace: "nowrap",
              }}
            >
              {node.label}
            </div>
          </div>
        );
      })}

      {/* Subtle ambient particles in the new world */}
      {Array.from({ length: 20 }).map((_, i) => {
        const particleDelay = 25 + i * 1.5;
        const pSpring = spring({
          frame: Math.max(0, frame - particleDelay),
          fps,
          config: { damping: 20, stiffness: 30, mass: 1 },
        });

        const px = 200 + (i * 137.5) % (width - 400);
        const py = 150 + (i * 89.3) % (height - 300);
        const pSize = 3 + (i % 4) * 2;

        return (
          <div
            key={`ambient-${i}`}
            style={{
              position: "absolute",
              left: px,
              top: py + Math.sin(frame * 0.05 + i) * 8,
              width: pSize,
              height: pSize,
              borderRadius: "50%",
              backgroundColor: PASTEL_PALETTE[i % PASTEL_PALETTE.length],
              opacity: pSpring * 0.4,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
