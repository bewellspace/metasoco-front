import { MantineThemeOverride, createStyles } from "@mantine/core";

const theme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    site: ["#EAF557"],
    bg: ["#23203D"],
  },
};

export const useSiteStyles = createStyles((theme) => {
  return {
    highlight: {
      color: theme.colors.site[0],
    },
    bgColor: {
      color: theme.colors.bg[0],
    },
    heroTitle: {
      fontSize: "1.4rem",
      fontFamily: "barlow-black",
      lineHeight: "1",
      [theme.fn.smallerThan("md")]: {
        fontSize: "1.25rem",
      },
    },
    modelTips: {
      fontSize: "16px",
      fontFamily: "inherit",
      lineHeight: 1,
      [theme.fn.smallerThan("md")]: {
        fontSize: "14px",
      },
      [theme.fn.largerThan("lg")]: {
        fontSize: "18px",
      },
    },
    teamPic: {
      width: "150px",
      [theme.fn.smallerThan("md")]: {
        width: "80px",
      },
      [theme.fn.largerThan("lg")]: {
        width: '300px !important'
      }
    },
    underLine: {
      fontSize: "14px",
      lineHeight: 1,
      padding: "5px 0",
      borderBottom: "1px solid #000",
      fontFamily: "Balthazar-Regular",
      [theme.fn.largerThan("lg")]: {
        fontSize: '16px'
      }
    },
    claimButton: {
      width: "75px",
      height: "30px",
      borderRadius: "30px",
      textAlign: "center",
      color: "#ffffff",
      background: "linear-gradient(180deg, #f97184, #f06c81 100%)",
      fontFamily: "Balthazar-Regular",
      "&:hover": {
        boxShadow: "2px 2px 2px rgba(9, 2, 4, 0.5)",
      },
    },
  };
});

export default theme;
