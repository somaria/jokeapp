import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react' // or "@remix-run/cloudflare"
import { Outlet, Link } from '@remix-run/react'
import { db } from '../utils/db.server'
import stylesUrl from '~/styles/jokes.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

type Props = {}

type LoaderData = {
  jokeListItems: { id: string; name: string }[]
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
      },
      orderBy: {createdAt: 'desc'},
    }),
  }
  return data
}

const Jokes = (props: Props) => {
  const data = useLoaderData<LoaderData>()
  console.log(data)

  return (
    <div className='jokes-layout'>
      <header className='jokes-header'>
        <div className='container'>
          <h1 className='home-link'>
            <Link to='/' title='Remix Jokes' aria-label='Remix Jokes'>
              <span className='logo'>🤪</span>
              <span className='logo-medium'>J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className='jokes-main'>
        <div className='container'>
          <div className='jokes-list'>
            <Link to='.'>Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokeListItems.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to='new' className='button'>
              Add your own
            </Link>
          </div>
          <div className='jokes-outlet'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Jokes
