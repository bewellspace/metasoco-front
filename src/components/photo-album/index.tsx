import PhotoAlbum, { PhotoProps } from 'react-photo-album'
import { MEDIA_TYPE } from '../../common/constants'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import { Tweet, Variant } from 'src/types'

const ArtAlbum = props => {
  const isPC = useMediaQuery('(min-width: 992px)')
  const { disablePreview, shadowBackground, loadMore, tweets = [] } = props
  const photos = tweets
    .map((tweet: Tweet) => {
      console.log(tweet)
      const art_media = tweet.medias[0] || ({} as any)
      const art_type = art_media?.type || 'photo'
      const variants = art_media?.variants || []
      if (variants && variants.length > 0) {
        let bit_rate = 0
        let videoSrc = ''
        variants.filter((variant: Variant) => variant.content_type === 'video/mp4').forEach((variants: Variant) => {
          if (variants.bit_rate >= bit_rate) {
            bit_rate = variants.bit_rate
            videoSrc = variants.url
          }
        })
        return {
          src: videoSrc,
          width: art_media.width,
          height: art_media.height,
          id: String(tweet.tweet_id) || '',
          poster: art_media.preview_image_url
        }
      }
      return {
        src: art_media[MEDIA_TYPE[art_type]],
        width: art_media.width,
        height: art_media.height,
        id: String(tweet.tweet_id) || '',
      }
    })
    .filter(tweet => tweet.src && tweet.src.length > 0)

  const renderPhoto = ({
    imageProps: { alt, style, ...rest },
    photo,
  }: PhotoProps) => {
    const isVideoReg = new RegExp('(.*)video.twimg.com(.*).mp4')
    const isVideo = isVideoReg.test(rest.src)
    return (
      (
        // @ts-ignore
        <Link href={`/gallery/${photo.id}`}>
          <a style={style}>
            {
              isVideo ? (
                <>
                  {/*// @ts-ignore*/}
                  <video
                    controls
                    loop
                    // @ts-ignore
                    poster={photo.poster}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                    }}
                    {...rest}
                  />
                </>
              ) : (
                <img
                  alt={alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                  }}
                  {...rest}
                />
              )
            }
          </a>
        </Link>
      )
    )
  }

  const [index, setIndex] = useState(0)

  const onLoadMore = () => {
    setIndex(index => index + 3)
  }

  return (
    <div className="photo-album-container">
      <PhotoAlbum
        photos={photos}
        layout={isPC ? 'rows' : 'columns'}
        columns={isPC ? undefined : 1}
        spacing={24}
        renderPhoto={renderPhoto}
      />
      {shadowBackground && (
        <>
          <Link href="/gallery">
            <div className="load-more-shadow" />
          </Link>
          <Link href="/gallery">
            <Button
              radius="xl"
              size="sm"
              sx={theme => ({
                backgroundColor: '#EAF557',
                position: 'absolute',
                padding: '12px 24px',
                left: 'calc(50% - 42px)',
                bottom: '50px',
                color: '#4909b2',
                '&:hover': {
                  backgroundColor: '#D5DF50',
                },
              })}
            >
              MORE
            </Button>
          </Link>
        </>
      )}
      {loadMore && (
        <div className="load-more-button">
          <Button
            radius="xl"
            size="sm"
            onClick={onLoadMore}
            sx={theme => ({
              backgroundColor: '#EAF557',
              '&:hover': {
                backgroundColor: '#D5DF50',
              },
              color: '#4909b2',
            })}
          >
            LOAD MORE
          </Button>
        </div>
      )}
      <style jsx>{`
        .photo-album-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .load-more-shadow {
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            0deg,
            #23203d 0%,
            rgba(35, 32, 61, 0) 100%
          );
        }
        .load-more-text {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 26px;
        }
        .load-more-button {
          width: 100%;
          height: max-content;
          margin-top: 48px;
          margin-bottom: 100px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default ArtAlbum
