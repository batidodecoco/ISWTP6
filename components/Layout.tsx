import Head from 'next/head'
import Router from 'next/router'
import { ReactElement, useCallback } from 'react'
import { BiChevronLeft } from 'react-icons/bi'

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

export default function Layout ({ children }: LayoutProps): ReactElement {
  const onBack = useCallback(() => {
    Router.back()
  }, [])

  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className='relative'>
        <nav className='w-full fixed top-0 bg-brand-amethyst p-6 flex justify-between items-center shadow-md'>
          <button onClick={onBack} className='flex items-center text-white p-2'>
            <BiChevronLeft size='20px' />
            <p>Volver</p>
          </button>
          <h1 className='text-brand-celeste text-2xl font-bold'>DeliverEat!</h1>
        </nav>
        <div className='mt-20 container p-4' style={{ minHeight: '100vh' }}>
          {children}
        </div>
      </div>
    </>
  )
}

export function withLayout (Page: any) {
  return function Wrapper (props: any) {
    return (
      <Layout>
        <Page {...props} />
      </Layout>
    )
  }
}
