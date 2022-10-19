import React from 'react'
import { Stack, Text } from '@mantine/core'
import useStyles from './LinksGroup.styles'
import Link from 'next/link'

export interface LinksGroupProps {
  title: string
  data: {
    link: string
    label: string
  }[]
}

export function LinksGroup({ data, title }: LinksGroupProps) {
  const { classes } = useStyles()
  const links = data.map((link, index) => {
    return (
      <Link href={link.link} key={index} passHref>
        <Text className={classes.link}>{link.label}</Text>
      </Link>
    )
  })

  return (
    <div className={classes.wrapper}>
      <Text className={classes.title}>{title}</Text>
      {links}
    </div>
  )
}
