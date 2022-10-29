import { useMediaQuery } from "@mantine/hooks";
import { Image as MImage, Center } from "@mantine/core";

export default function Blindbox({ width = 'auto', height = 'auto' }) {

  const isBreakpointLg = useMediaQuery("(min-width: 1201px)");
  const isBreakpointXs = useMediaQuery("(max-width: 576px)");
  return (
    <Center
      sx={(theme) => ({
        position: "relative",
        width: width,
        height: height
      })}
    >
      <Center
        sx={(theme) => ({
          width: width,
          height: height
        })}
      >
        <MImage src="/blind-box-bg.png"></MImage>
        <Center
          sx={() => ({
            position: "absolute",
            top: "30%",
            width: "50%",
            zIndex: 2,
            animation: "bounce-down 1.5s linear infinite",
          })}
        >
          <MImage src="/box.png"></MImage>
        </Center>
        <Center
          sx={() => ({
            position: "absolute",
            bottom: "20%",
            width: "50%",
            animation: "scale-scale 1.5s linear infinite",
          })}
        >
          <MImage src="/box-shadow.png"></MImage>
        </Center>
      </Center>
    </Center>
  );
}
