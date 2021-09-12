import React, { ReactElement } from 'react'
import { FiLock } from 'react-icons/fi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import dayjs from '../../utils/dayjs'
import ReactInputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'
import ProductDetailsSchema from '../Schemas/ProductDetailsSchema'

export default function ProductDetails (): ReactElement {
  return (
    <Formik
      initialValues={{
        paymentMethod: 'cash',
        arrivalTime: 'asap',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardHolderName: '',
        cashAmount: '',
        arrivalDate: dayjs().toDate()
      }}
      onSubmit={async (values) => {
        console.log(values)
      }}
      validationSchema={ProductDetailsSchema}
      enableReinitialize
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
                    onBlur={() =>
                      props.setFieldTouched('cardNumber', true, true)}
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
                    mask='99/9999'
                    placeholder='MM/AAAA'
                    value={props.values.cardExpiry}
                    onBlur={() =>
                      props.setFieldTouched('cardExpiry', true, true)}
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
            {props.values.arrivalTime === 'let-me-decide' && (
              <>
                <DatePicker
                  selected={props.values.arrivalDate}
                  onChange={(date) =>
                    props.setFieldValue('arrivalDate', date, true)}
                  showTimeSelect
                  className='w-full'
                  locale='es'
                  dateFormat='dd MMMM yyyy h:mm aa'
                  minDate={dayjs().toDate()}
                  maxDate={dayjs().add(7, 'day').toDate()}
                  filterTime={(time) => {
                    const currentDate = new Date()
                    const selectedDate = new Date(time)

                    return currentDate.getTime() < selectedDate.getTime()
                  }}
                />
                <ErrorMessage name='arrivalDate'>
                  {(msg) => (
                    <div className='pt-1 text-red-400 text-xs'>{msg}</div>
                  )}
                </ErrorMessage>
              </>
            )}
          </div>

          <div className='mt-4 w-full flex justify-end'>
            <button
              type='submit'
              className='flex items-center bg-brand-violet text-white py-4 px-8 rounded-md'
              disabled={props.isSubmitting || !props.isValid}
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
