import { Global, MantineTheme } from "@mantine/core";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme: MantineTheme) => [
        {
          "@font-face": {
            fontFamily: 'Saira-Black',
            src: `url('/fonts/Saira-Black.ttf') format("truetype")`,
            fontWeight: 400,
            fontStyle: "normal",
          }
        },
        {
          "@font-face": {
            fontFamily: 'Balthazar-Regular',
            src: `url('/fonts/Balthazar-Regular.ttf') format("truetype")`,
            fontWeight: 400,
            fontStyle: "normal",
          }
        },
        {
          "@font-face": {
            fontFamily: "ale-general",
            src: `url('/fonts/Alegreya-Regular.otf') format("opentype")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "barlow-black",
            src: `url('/fonts/Barlow-BlackItalic.ttf') format("truetype")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          body: {
            backgroundColor: "#e3e9f5",
            color:
              theme.colorScheme === "dark" ? '#000' : theme.black,
            lineHeight: theme.lineHeight,
            fontSize: theme.fontSizes.md,
            fontFamily: "Balthazar-Regular",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          p: {
            margin: "6px 0",
          },
        },
      ]}
    />
  );
}
