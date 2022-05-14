import {
  LinksFunction,
  MetaFunction,
  ActionFunction,
  redirect,
} from '@remix-run/node' // or "@remix-run/cloudflare"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { db } from '../../utils/db.server'

type Props = {}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name')
  const content = form.get('content')

  if (typeof name != 'string' || typeof content != 'string')
    throw new Error('Not able to submit form')

  const fields = { name, content }

  const joke = await db.joke.create({
    data: fields,
  })

  return redirect(`/jokes/${joke.id}`)
}

const New = (props: Props) => {
  return (
    <div>
      <div>Add your own jokes</div>
      <form method='post'>
        <div>
          <label htmlFor='Name'>
            Name:{' '}
            <input type='text' name='name' placeholder='Input Your Name' />
          </label>
        </div>
        <div>
          <label htmlFor='Content'>
            Content: <textarea name='content'></textarea>
          </label>
        </div>
        <div>
          <button type='submit' className='button'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default New
