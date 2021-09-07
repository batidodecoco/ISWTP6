import '../styles/global.css'
import { AppProps } from 'next/app'
import styles from '../styles/_app.module.css'
import { ReactElement } from 'react'

function MyApp ({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
