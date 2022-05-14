import type { LinksFunction, MetaFunction } from '@remix-run/node' // or "@remix-run/cloudflare"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'


type Props = {}

const JokeIndex = (props: Props) => {
  return <div>Another Jokes Index Route</div>
}

export default JokeIndex
