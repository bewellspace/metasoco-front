import { Box, Group, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { LinksGroup } from 'src/components/LinksGroup'
import { FOOTER_LINKS_DATA } from 'src/components/LinksGroup/data'
import Image from 'next/image'

const Footer = () => {
  const isPC = useMediaQuery('(min-width: 992px)')
  return (
    <Box style={{ backgroundColor: '#4909B2' }}>
      <Group
        sx={theme => ({
          padding: '5rem 0rem',
          marginTop: '10rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '70vw',
          margin: '0 auto',
          [theme.fn.smallerThan('md')]: {
            padding: '3rem 2rem',
            width: '100%',
            flexDirection: 'column',
          },
        })}
      >
        <Stack justify="flex-start">
          <Box>
            <Image
              src="/logo.png"
              height={isPC ? 32 : 20}
              width={isPC ? 254 : 128}
            />
          </Box>
          <Group className="footer-logo-text">
            <Text weight={700} size="lg" color="rgba(255, 255, 255, 0.5)">
              Powered By
            </Text>
            <Image
              src="/CDFullLogo.png"
              height={isPC ? 32 : 21}
              width={isPC ? 180 : 119}
            />
          </Group>
        </Stack>

        <Box
          sx={theme => ({
            display: 'flex',
            [theme.fn.smallerThan('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '1.25rem',
            },
          })}
        >
          {FOOTER_LINKS_DATA.map(group => (
            <LinksGroup
              data={group.data}
              title={group.title}
              key={group.title}
            />
          ))}
        </Box>
      </Group>
    </Box>
  )
}

export default Footer
