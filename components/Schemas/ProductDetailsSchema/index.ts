import dayjs from '../../../utils/dayjs'
import * as Yup from 'yup'
import { isUndefined } from 'lodash'

const DetailsSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .matches(/^(cash|visa)$/)
    .required('Requerido'),
  arrivalTime: Yup.string()
    .matches(/^(asap|let-me-decide)$/)
    .required('Requerido'),
  cardNumber: Yup.string().test(
    'card-number',
    'Número de tarjeta inválido',
    (value, schema) => {
      if (schema.parent.paymentMethod === 'cash') return true

      const cardNumber = (value ?? '').replaceAll('-', '')

      return new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/).test(cardNumber)
    }
  ),
  cardExpiry: Yup.string().test(
    'valid-card-expiry',
    'La fecha de expiración es inválida',
    (cardExpiry, schema) => {
      if (schema.parent.paymentMethod === 'cash') return true

      return (
        !isUndefined(cardExpiry) &&
        dayjs(cardExpiry, 'MM/YYYY', true).isValid() &&
        dayjs(cardExpiry, 'MM/YYYY', true).isSameOrAfter(dayjs(), 'M')
      )
    }
  ),
  cardCvc: Yup.string().when('paymentMethod', {
    is: 'visa',
    then: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'El CVC debe ser de 3 o 4 dígitos')
      .required('Requerido'),
    otherwise: Yup.string().optional()
  }),
  cardHolderName: Yup.string().when('paymentMethod', {
    is: 'visa',
    then: Yup.string().required('Requerido'),
    otherwise: Yup.string().optional()
  }),
  cashAmount: Yup.number()
    .when('paymentMethod', {
      is: 'cash',
      then: Yup.number()
        .min(2220, 'El monto debe ser mayor al total')
        .required('Requerido'),
      otherwise: Yup.number().optional()
    })
    .typeError('Inválido'),
  arrivalDate: Yup.mixed().when('arrivalTime', {
    is: 'let-me-decide',
    then: Yup.mixed()
      .test('valid-date', 'Debes ingresar una fecha válida', (value) => {
        if (value === null) return true
        return dayjs(value).isSameOrAfter(dayjs(), 'hour')
      })
      .required('Requerido'),
    otherwise: Yup.mixed().optional()
  })
})

export default DetailsSchema
