import { createClient } from '@supabase/supabase-js'
import { Client, auth } from 'twitter-api-sdk'
import 'dotenv/config'
import {
  tweetsRecentSearch,
  TwitterPaginatedResponse,
  TwitterResponse,
} from 'twitter-api-sdk/dist/types'
import { Tweet } from 'src/types'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON
)
const client = new Client(process.env.TWITTER_BEARER_TOKEN as string)

const sync = async (pages = 100) => {
  const results: any[] = []
  let next_token: string | undefined = undefined
  while (pages--) {
    const data = await client.tweets.tweetsRecentSearch({
      query: '#ETHMergeArt',
      max_results: 100,
      // end_time: '2022-08-22T03:39:21.000Z',
      next_token,
      expansions: ['attachments.media_keys', 'author_id'],
      'user.fields': ['username', 'created_at', 'name', 'profile_image_url'],
      'tweet.fields': [
        // 'entities',
        'referenced_tweets',
        'attachments',
        'lang',
        'created_at',
        'text',
      ],
      'media.fields': ['preview_image_url', 'url', 'width', 'height', 'variants'],
    })

    if (!data) {
      // ignore
      return
      // throw new Error("Couldn't Search Result")
    }
    data.data = data.data?.filter(
      d =>
        !d.referenced_tweets?.find(x =>
          ['retweeted', 'quoted', 'replied_to'].includes(x.type)
        )
    )
    next_token = data.meta?.next_token
    if (data.data.length) {
      const { error, count } = await supabase
        .from('ethmergeart')
        .upsert(processSearchResult(data), { onConflict: 'tweet_id' })
      // console.log('upsert', count, error)
      results.push(...processSearchResult(data))
    }
  }

  console.log('upsert', results.length)
}

const processSearchResult = (result: TwitterResponse<tweetsRecentSearch>) => {
  const { data, includes, meta } = result

  const output: Tweet[] = []
  data?.forEach(tweet => {
    const { author_id, text, created_at } = tweet
    const author = includes?.users?.find(author => author.id === author_id)
    const media_keys = tweet.attachments?.media_keys || []
    const medias = includes?.media?.filter(media =>
      media_keys.includes(media.media_key!)
    )
    output.push({
      tweet_id: tweet.id,
      text,
      username: author?.name || '',
      avatar: author?.profile_image_url,
      user_id: author?.username || '',
      medias: (medias as any) || [],
      created_at: created_at!,
    })
  })
  return output
}

const fetch = async () => {
  const { data, error } = await supabase
    .from('ethmergeart')
    .select('*')
    .limit(10)

  console.log({ data, error })
}

sync()
// fetch()
