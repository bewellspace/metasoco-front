import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import useStyles from './Logo.styles'

export function Logo() {
  const { classes } = useStyles()

  return (
    <Link href="/" className={classes.logo} aria-label="Metasoco">
      <a style={{ display: 'flex' }}>
        <Image src="/logo.png" width="140" height="30" />
      </a>
    </Link>
  )
}
