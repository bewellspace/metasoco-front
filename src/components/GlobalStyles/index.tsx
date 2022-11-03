import { Global, MantineTheme } from "@mantine/core";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme: MantineTheme) => [
        {
          "@font-face": {
            fontFamily: 'BalooBhaina',
            src: `url('/fonts/BalooBhaina.ttf') format("truetype")`,
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
            fontFamily: 'AlegreyaSans-Black',
            src: `url('/fonts/AlegreyaSans-Black.ttf') format("truetype")`,
            fontWeight: 400,
            fontStyle: "normal",
          }
        },
        {
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          body: {
            backgroundColor: "#1d4111",
            color: '#FBFAFA',
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
