import { createStyles } from '@mantine/core'

export default createStyles(theme => ({
  wrapper: {
    '& + &': {
      marginLeft: 60,
    },

    [theme.fn.smallerThan('md')]: {
      '& + &': {
        marginLeft: 0,
        marginTop: '1em',
      },
    },
  },

  link: {
    display: 'block',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    marginBottom: theme.spacing.xs / 2,
    color: theme.white,
  },
}))
