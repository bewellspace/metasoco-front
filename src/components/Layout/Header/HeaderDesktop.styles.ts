import { createStyles } from '@mantine/core';

export const HEADER_HEIGHT = 70;

export default createStyles((theme) => ({
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 6,
    position: 'fixed',
    background: 'url("/nav-bg.png") no-repeat transparent',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    padding: '0 40px',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  logo: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  mainSection: {
    display: 'flex',
    alignItems: 'center',
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
  },

  menus: {
    color: '#fff',
  },
  menuItem: {
    color: '#fafafa',
    fontSize: '20px',
    lineHeight: '20px',
    fontFamily: 'Balthazar-Regular',
    textShadow: '0px 7px 5px #000000',
    '&:hover': {
      color: '#f2ea19',
    },
  },
  menuItemSelected: {
    color: '#f2ea19',
    fontSize: '20px',
    lineHeight: '20px',
    fontFamily: 'Balthazar-Regular',
    textShadow: '0px 7px 5px #000000',
    '&:hover': {
      color: '#f2ea19',
    },
  },
  controls: {
    display: 'flex',
  },
}));
