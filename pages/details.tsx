import React, { ReactElement } from 'react'
import { withLayout } from '../components/Layout'
import { FiLock } from 'react-icons/fi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { isUndefined } from 'lodash'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ReactInputMask from 'react-input-mask'

dayjs.extend(isSameOrAfter)
dayjs.extend(customParseFormat)

const ValidationSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .matches(/^(cash|visa)$/)
    .required('Requerido'),
  arrivalTime: Yup.string()
    .matches(/^(asap|let-me-decide)$/)
    .required('Requerido'),
  cardNumber: Yup.string()
    .test('card-number', 'Número de tarjeta inválido', value => {
      const cardNumber = (value ?? '').replaceAll('-', '')

      return new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/).test(cardNumber)
    })
    .required('Requerido'),
  cardExpiry: Yup.string().test(
    'valid-card-expiry',
    'La fecha de expiración es inválida',
    (cardExpiry) => {
      return (
        !isUndefined(cardExpiry) &&
        dayjs(cardExpiry, 'MM/YY', true).isSameOrAfter(dayjs(), 'M')
      )
    }
  ),
  cardCvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'El CVC debe ser de 3 o 4 dígitos')
    .required('Requerido'),
  cardHolderName: Yup.string().required('Requerido'),
  cashAmount: Yup.number().when('paymentMethod', {
    is: 'cash',
    then: Yup.number()
      .min(2220, 'El monto debe ser mayor al total')
      .required('Requerido'),
    otherwise: Yup.number().optional()
  })
})

function DetailsPage (): ReactElement {
  return (
    <Formik
      initialValues={{
        paymentMethod: 'cash',
        arrivalTime: 'asap',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardHolderName: '',
        cashAmount: ''
      }}
      onSubmit={async (values) => {
        console.log(values)
      }}
      validationSchema={ValidationSchema}
    >
      {(props) => (
        <Form>
          <h1 className='text-2xl text-gray-500'>Este es tu detalle</h1>

          <div className='p-8 border border-gray-200 flex flex-col rounded-md shadow-md bg-white'>
            <div className='my-1 flex justify-between items-center'>
              <p>2 x Lomito Vegano</p>
              <p>$1500</p>
            </div>
            <div className='my-1 flex justify-between items-center'>
              <p>3 x Taco Vegano</p>
              <p>$600</p>
            </div>
            <div className='mt-4 mb-2 flex justify-between items-center'>
              <p className='text-sm text-gray-500'>Costo de envío</p>
              <p>+ $120</p>
            </div>
            <div className='border-t border-dashed border-gray-500'>
              <p className='mt-2 text-right font-bold tracking-wider text-2xl'>
                $2220
              </p>
            </div>
          </div>

          <h2 className='my-4 text-2xl text-gray-500'>
            ¿Como quieres pagar tu pedido?
          </h2>

          <div className='p-8 border border-gray-200 flex flex-col rounded-md shadow-md bg-white'>
            <div className='my-2 flex items-center'>
              <Field
                type='radio'
                name='paymentMethod'
                value='cash'
                className='text-brand-violet'
              />
              <p className='ml-2'>En efectivo</p>
            </div>
            {props.values.paymentMethod === 'cash' && (
              <>
                <Field
                  type='text'
                  className='w-full'
                  name='cashAmount'
                  placeholder='Ingresar monto'
                />
                <ErrorMessage name='cashAmount'>
                  {(msg) => (
                    <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                  )}
                </ErrorMessage>
              </>
            )}
            <div className='my-2 flex items-center'>
              <Field
                type='radio'
                name='paymentMethod'
                value='visa'
                className='text-brand-violet'
              />
              <p className='ml-2'>Visa</p>
            </div>
            {props.values.paymentMethod === 'visa' && (
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <ReactInputMask
                    className='w-full'
                    type='text'
                    mask='9999-9999-9999-9999'
                    placeholder='Número de tarjeta'
                    value={props.values.cardNumber}
                    onBlur={() => props.setFieldTouched('cardNumber', true, true)}
                    onChange={(e) => {
                      props.setFieldValue('cardNumber', e.target.value, true)
                    }}
                  />
                  <ErrorMessage name='cardNumber'>
                    {(msg) => (
                      <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='col-span-2'>
                  <Field
                    type='text'
                    className='w-full'
                    name='cardHolderName'
                    placeholder='Nombre del titular'
                  />
                  <ErrorMessage name='cardHolderName'>
                    {(msg) => (
                      <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <ReactInputMask
                    className='w-full'
                    type='text'
                    mask='99/99'
                    placeholder='MM/AA'
                    value={props.values.cardExpiry}
                    onBlur={() => props.setFieldTouched('cardExpiry', true, true)}
                    onChange={(e) =>
                      props.setFieldValue('cardExpiry', e.target.value)}
                  />
                  <ErrorMessage name='cardExpiry'>
                    {(msg) => (
                      <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <Field
                    type='text'
                    className='w-full'
                    name='cardCvc'
                    placeholder='CVC'
                  />
                  <ErrorMessage name='cardCvc'>
                    {(msg) => (
                      <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
            )}
          </div>

          <h2 className='my-4 text-2xl text-gray-500'>
            ¿Cuando lo quieres recibir?
          </h2>

          <div className='p-8 border border-gray-200 flex flex-col rounded-md shadow-md bg-white'>
            <div className='my-2 flex items-center'>
              <Field
                type='radio'
                name='arrivalTime'
                value='asap'
                className='text-brand-violet'
              />
              <p className='ml-2'>Lo antes posible</p>
            </div>
            <div className='my-2 flex items-center'>
              <Field
                type='radio'
                name='arrivalTime'
                value='let-me-decide'
                className='text-brand-violet'
              />
              <p className='ml-2'>Quiero decidir yo</p>
            </div>
          </div>

          <div className='mt-4 w-full flex justify-end'>
            <button
              type='submit'
              className='flex items-center bg-brand-violet text-white py-4 px-8 rounded-md'
            >
              <FiLock className='mr-2' />
              <p>Pagar</p>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default withLayout(DetailsPage)
