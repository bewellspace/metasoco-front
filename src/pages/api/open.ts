import supabase from 'src/common/db'

export default async function open(request, response) {
  const { id } = request.query
  const ids = []
  if (Array.isArray(id)) {
    ids.push(...id)
  } else {
    ids.push(...id.split(','))
  }

  try {
    await supabase.from('ethmergeart').upsert(
      ids.map(i => ({ tweet_id: i, banned: false })),
      { onConflict: 'tweet_id' }
    )
    response.status(200).send(`ok`)
  } catch (error) {
    console.error(error)
    response.status(400).json({ error: error.message })
  }
}
