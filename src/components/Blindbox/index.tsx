import { Image as MImage, Center } from "@mantine/core";

export default function Blindbox({ width = 'auto', xsWidth = 'auto' }) {
  return (
    <Center
      sx={(theme) => ({
        position: "relative",
      })}
    >
      <Center
        sx={(theme) => ({
          width: width,
          [theme.fn.smallerThan("xs")]: {
            width: xsWidth,
          },
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
