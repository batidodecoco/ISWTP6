import Head from 'next/head'
import { ReactElement } from 'react'

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

export default function Layout ({ children }: LayoutProps): ReactElement {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div>{children}</div>
    </>
  )
}

// Create withLayout HOC
export function withLayout (Page: any) {
  return function Wrapper (props: any) {
    return (
      <Layout>
        <Page {...props} />
      </Layout>
    )
  }
}
