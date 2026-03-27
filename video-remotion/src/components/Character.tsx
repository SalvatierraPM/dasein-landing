import React from "react";
import { COLORS } from "../colors";

interface CharacterProps {
  opacity?: number;
  scale?: number;
  glowIntensity?: number;
}

export const Character: React.FC<CharacterProps> = ({
  opacity = 1,
  scale = 1,
  glowIntensity = 0,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <svg
        width="200"
        height="340"
        viewBox="0 0 200 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              stdDeviation={8 + glowIntensity * 12}
              result="blur"
            />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="handGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.lavender} stopOpacity={glowIntensity * 0.8} />
            <stop offset="100%" stopColor={COLORS.lavender} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Head — circle */}
        <circle cx="100" cy="50" r="35" fill={COLORS.purple} />

        {/* Body — rounded trapezoid */}
        <path
          d="M70 95 L130 95 L140 220 Q140 230 130 230 L70 230 Q60 230 60 220 Z"
          fill={COLORS.purple}
          rx="10"
        />

        {/* Left arm — raised, gathering */}
        <path
          d="M70 110 Q30 130 25 170 Q22 185 35 185"
          stroke={COLORS.purple}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right arm — raised, gathering */}
        <path
          d="M130 110 Q170 130 175 170 Q178 185 165 185"
          stroke={COLORS.purple}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left leg */}
        <path
          d="M80 230 L75 310 Q74 320 80 320 L95 320"
          stroke={COLORS.purple}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right leg */}
        <path
          d="M120 230 L125 310 Q126 320 120 320 L105 320"
          stroke={COLORS.purple}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hand glow areas */}
        <circle cx="35" cy="185" r={30 + glowIntensity * 20} fill="url(#handGlow)" />
        <circle cx="165" cy="185" r={30 + glowIntensity * 20} fill="url(#handGlow)" />
      </svg>
    </div>
  );
};
