import '../styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'

registerLocale('es', es)
setDefaultLocale('es')

function MyApp ({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
