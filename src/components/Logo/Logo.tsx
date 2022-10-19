import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import useStyles from './Logo.styles'

export function Logo() {
  const { classes } = useStyles()

  return (
    <Link href="/" className={classes.logo} aria-label="Metasoco">
      <Image src="/logo.png" width="140" height="30" />
    </Link>
  )
}
