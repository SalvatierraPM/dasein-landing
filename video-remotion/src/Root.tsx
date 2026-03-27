import { Composition } from "remotion";
import { DaseinIntro } from "./DaseinIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DaseinIntro"
      component={DaseinIntro}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
