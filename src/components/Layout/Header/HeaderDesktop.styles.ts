import { createStyles } from "@mantine/core";

export const HEADER_HEIGHT = 80;

export default createStyles((theme) => ({
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 6,
    position: "fixed",
    backgroundColor: "#f3f7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.08)",
    padding: "0 80px",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  logo: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
  },

  mainSection: {
    display: "flex",
    alignItems: "center",
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    pointerEvents: "all",
  },

  menus: {
    color: "#fff",
  },
  menuItem: {
    color: "#555555",
    backgroundColor: "#c3d2ef",
    padding: "0 34px",
    fontSize: "16px",
    lineHeight: "20px",
    height: "40px",
    fontFamily: "ale-general",
    "&:hover": {
      color: "#fcf7f7",
      backgroundColor: "#f3546a",
    },
  },
  menuItemSelected: {
    color: "#fcf7f7",
    backgroundColor: "#f3546a",
    padding: "0 34px",
    fontSize: "16px",
    lineHeight: "20px",
    height: "40px",
    fontFamily: "ale-general",
    "&:hover": {
      color: "#fcf7f7",
      backgroundColor: "#f3546a",
    },
  },
  controls: {
    display: "flex",
  },
}));
