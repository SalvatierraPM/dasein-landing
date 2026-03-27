import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { TheGathering } from "./components/TheGathering";
import { TheLaunch } from "./components/TheLaunch";
import { TheApproach } from "./components/TheApproach";
import { ThePortal } from "./components/ThePortal";
import { COLORS } from "./colors";

export const DaseinIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const bgColor = interpolate(frame, [160, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const backgroundColor = bgColor === 0
    ? COLORS.periwinkle
    : bgColor === 1
      ? COLORS.daseinNavy
      : `color-mix(in srgb, ${COLORS.periwinkle} ${Math.round((1 - bgColor) * 100)}%, ${COLORS.daseinNavy})`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.periwinkle,
        overflow: "hidden",
      }}
    >
      {/* Background transition layer */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.daseinNavy,
          opacity: interpolate(frame, [160, 200], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Sequence from={0} durationInFrames={90} name="The Gathering">
        <TheGathering />
      </Sequence>

      <Sequence from={60} durationInFrames={90} name="The Launch">
        <TheLaunch />
      </Sequence>

      <Sequence from={120} durationInFrames={90} name="The Approach">
        <TheApproach />
      </Sequence>

      <Sequence from={180} durationInFrames={60} name="The Portal">
        <ThePortal />
      </Sequence>
    </AbsoluteFill>
  );
};
