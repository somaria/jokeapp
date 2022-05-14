import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react' // or "@remix-run/cloudflare"
import { Outlet, Link } from '@remix-run/react'
import { db } from '../../utils/db.server'
import { Joke } from '@prisma/client'

type Props = {}

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.id },
  })

  if (!joke) throw new Error('Joke not found')

  const data = { joke }

  return data
}

type LoaderData = { joke: Joke }

const JokeId = (props: Props) => {
  const data = useLoaderData<LoaderData>()
  console.log('the content here')
  console.log(data.joke.content)
  return (
    <div>
      <div>Here is your joke:</div>
      <p>{data.joke.content}</p>
      <Link to='.'>{data.joke.name} Permalink</Link>
    </div>
  )
}

export default JokeId
