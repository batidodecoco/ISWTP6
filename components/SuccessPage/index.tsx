import { ReactElement } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

export default function Success (): ReactElement {
  return (
    <div>
      <div className='mt-48 flex flex-col items-center'>
        <IoMdCheckmark className='text-green-700 text-6xl' />
        <h1 className='mt-8 text-brand-wisteria font-bold text-5xl'>
          Felicidades!
        </h1>
        <p className='text-gray-500'>Tu pedido fue realizado éxitosamente</p>
      </div>
      <div className='my-8' />
    </div>
  )
}
