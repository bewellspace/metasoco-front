import { createStyles } from '@mantine/core'
import { HEADER_HEIGHT } from './HeaderDesktop.styles'

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
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    paddingRight: 'var(--removed-scroll-width, 0px)',
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  logo: {
    height: HEADER_HEIGHT,
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
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

  version: {
    ...theme.fn.focusStyles(),
    fontWeight: 700,
    textDecoration: 'none',
    marginTop: 2,

    [theme.fn.smallerThan(860)]: {
      display: 'none',
    },
  },

  drawerList: {
    marginTop: '36px',
  },

  drawerListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    marginTop: '16px',
    width: '100%',
  },

  drawerListItemText: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FBFAFA',
    fontFamily: 'Balthazar-Regular',
  },
}))
