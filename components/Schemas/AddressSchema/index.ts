import * as Yup from 'yup'

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

export default AddressSchema
