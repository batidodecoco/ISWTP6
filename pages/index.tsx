import { ReactElement, useEffect, useState } from 'react'
import { withLayout } from '../components/Layout'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { isNil } from 'lodash'
import Router from 'next/router'

const AddressSchema = Yup.object().shape({
  street: Yup.string().max(50, 'La calle es inválida').required('Requerido'),
  number: Yup.number()
    .max(99999, 'El número es inválido')
    .required('Requerido')
    .typeError('El número es inválido'),
  floor: Yup.number()
    .max(200, 'El piso es inválido')
    .optional()
    .typeError('El número es inválido'),
  apartment: Yup.string().optional(),
  city: Yup.string().required('Requerido'),
  optionalReference: Yup.string()
    .max(100, 'La referencia es inválida')
    .optional()
})

interface Address {
  street: string
  number: string | number
  floor: string | number
  apartment: string
  city: string
  optionalReference: string
}

function Index (): ReactElement {
  const [initialValues, setInitialValues] = useState<Address>({
    street: '',
    number: '',
    floor: '',
    apartment: '',
    city: '1',
    optionalReference: ''
  })

  useEffect(() => {
    if (!isNil(localStorage.getItem('address'))) {
      setInitialValues(JSON.parse(localStorage.getItem('address') as string))
    }
  }, [])

  return (
    <div>
      <h1 className='text-2xl text-gray-500'>Ingresá tu dirección</h1>
      <Formik
        initialValues={{
          street: initialValues.street,
          number: initialValues.number,
          floor: initialValues.floor,
          apartment: initialValues.apartment,
          city: initialValues.city,
          optionalReference: initialValues.optionalReference
        }}
        onSubmit={async (values) => {
          localStorage.setItem('address', JSON.stringify(values))
          await Router.push('/details')
        }}
        validationSchema={AddressSchema}
        enableReinitialize
      >
        <Form>
          <div className='mt-8 grid grid-cols-2 gap-4'>
            <div>
              <Field
                label='Calle'
                name='street'
                type='text'
                className='w-full border-b rounded-md'
                placeholder='Calle...'
              />
              <ErrorMessage name='street'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div>
              <Field
                label='Número'
                name='number'
                type='text'
                className='w-full rounded-md'
                placeholder='Número....'
              />
              <ErrorMessage name='number'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div>
              <Field
                label='Piso'
                name='floor'
                type='text'
                className='w-full rounded-md'
                placeholder='Piso...'
              />
              <ErrorMessage name='floor'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div>
              <Field
                label='Departamento'
                name='apartment'
                type='text'
                className='w-full rounded-md'
                placeholder='Departamento...'
              />
              <ErrorMessage name='apartment'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className='col-span-2'>
              <Field
                as='select'
                className='w-full rounded-md'
                label='Seleccioná tu ciudad'
                name='city'
              >
                <option value='1'>Córdoba</option>
                <option value='2'>Las Varillas</option>
                <option value='3'>Jesus María</option>
              </Field>
              <ErrorMessage name='city'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className='col-span-2'>
              <Field
                as='textarea'
                className='w-full rounded-md'
                label='Ingresar referencia opcional'
                name='optionalReference'
                placeholder='Ingresá referencia opcional...'
                rows={4}
              />
              <ErrorMessage name='optionalReference'>
                {(msg) => (
                  <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                )}
              </ErrorMessage>
            </div>
          </div>
          <div className='mt-4 w-full flex justify-end'>
            <button
              type='submit'
              className='bg-brand-violet text-white py-4 px-8 rounded-md'
            >
              Siguiente
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default withLayout(Index)
