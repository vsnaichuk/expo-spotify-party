import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
// export { default } from '../src/views/Authenticate-Spotify'
// const Page = dynamic(() => import('../src/views/Authenticate-Spotify'), {
//   ssr: false,
//   loading: () => <div>Hi</div>,
// })
console.log('okkk', process.browser)
let Page: ComponentType
if (process.browser) {
  Page = require('../src/views/Authenticate-Spotify')
  console.log({ Page })
} else {
  Page = () => null
}
export default () => {
  console.log('hey')
  return null
  return <Page />
}
