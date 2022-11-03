import { MantineThemeOverride, createStyles } from '@mantine/core'

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    site: ['#EAF557'],
    bg: ['#23203D'],
  },
}

export const useSiteStyles = createStyles((theme) => {
  return {
    highlight: {
      color: theme.colors.site[0],
    },
    bgColor: {
      color: theme.colors.bg[0],
    },
    heroTitle: {
      fontSize: '1.6rem',
      fontFamily: 'BalooBhaina',
      lineHeight: '1',
      color: '#F8D648',
      textShadow: '0px 5px 5px #000000',
      [theme.fn.smallerThan('md')]: {
        fontSize: '1.25rem',
      },
      [theme.fn.largerThan('lg')]: {
        fontSize: '2.2rem',
      },
    },
    modelTips: {
      fontSize: '1rem',
      fontFamily: 'inherit',
      lineHeight: 1,
      [theme.fn.smallerThan('md')]: {
        fontSize: '14px',
      },
      [theme.fn.largerThan('lg')]: {
        fontSize: '1.2rem',
      },
    },
    teamPic: {
      width: '150px',
      [theme.fn.smallerThan('md')]: {
        width: '80px',
      },
      [theme.fn.largerThan('lg')]: {
        width: '300px !important',
      },
    },
    underLine: {
      fontSize: '17px',
      lineHeight: 1,
      padding: '5px 0',
      // borderBottom: '1px solid #000',
      fontFamily: 'Balthazar-Regular',
      [theme.fn.largerThan('lg')]: {
        fontSize: '18px',
      },
    },
    claimButton: {
      background: 'linear-gradient(#f59e32, #f22819)',
      textAlign: 'center',
      color: '#F9F9FC !important',
      borderRadius: '6px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.66)',
      transform: 'scale(1)',
      transition: 'transform 0.1s linear 0s',
      fontFamily: 'Balthazar-Regular',
      fontSize: '15px',
      lineHeight: 1,
      height: '27px',
      border: 'none',
      padding: '6px 16px',
      '&:hover': {
        background: 'linear-gradient(#f36d23, #f22919)',
      },
      '&:before': {
        borderRadius: '6px !important',
      },
    },
  }
})

export default theme
