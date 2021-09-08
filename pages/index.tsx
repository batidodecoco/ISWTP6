import { Button, TextField } from '@material-ui/core'
import { ReactElement, useEffect, useState } from 'react'
import { withLayout } from '../components/Layout'
import styles from '../styles/index.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Router from 'next/router'
import { isNil, isUndefined } from 'lodash'

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

  const formik = useFormik({
    initialValues,
    validationSchema: AddressSchema,
    onSubmit: async (values) => {
      localStorage.setItem('address', JSON.stringify(values))
      await Router.push('/')
    },
    enableReinitialize: true
  })

  useEffect(() => {
    if (!isNil(localStorage.getItem('address'))) {
      setInitialValues(JSON.parse(localStorage.getItem('address') as string))
    }
  }, [])

  return (
    <div>
      <Button color='primary'>
        <p className={styles.text}>Volver</p>
      </Button>
      <h1 className={styles.heading}>Ingresá tu dirección</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.grid}>
          <TextField
            label='Calle'
            name='street'
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!isUndefined(formik.touched.street) && !isUndefined(formik.errors.street)}
            helperText={!isUndefined(formik.touched.street) && !isUndefined(formik.errors.street)}
          />
          <TextField
            label='Número'
            name='number'
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!isUndefined(formik.touched.number) && !isUndefined(formik.errors.number)}
            helperText={!isUndefined(formik.touched.number) && !isUndefined(formik.errors.number)}
          />
          <TextField
            label='Piso'
            name='floor'
            value={formik.values.floor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!isUndefined(formik.touched.floor) && !isUndefined(formik.errors.floor)}
            helperText={!isUndefined(formik.touched.floor) && !isUndefined(formik.errors.floor)}
          />
          <TextField
            label='Departamento'
            name='apartment'
            value={formik.values.apartment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!isUndefined(formik.touched.apartment) && !isUndefined(formik.errors.apartment)}
            helperText={!isUndefined(formik.touched.apartment) && !isUndefined(formik.errors.apartment)}
          />
          <TextField
            className={styles.selectCity}
            label='Seleccioná tu ciudad'
            name='city'
            select
            SelectProps={{
              native: true
            }}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!isUndefined(formik.touched.city) && !isUndefined(formik.errors.city)}
            helperText={!isUndefined(formik.touched.city) && !isUndefined(formik.errors.city)}
          >
            <option value='1'>Córdoba</option>
            <option value='2'>Las Varillas</option>
            <option value='3'>Jesus María</option>
          </TextField>
          <TextField
            className={styles.textArea}
            label='Ingresar referencia opcional'
            name='optionalReference'
            multiline
            rows={4}
            value={formik.values.optionalReference}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !isUndefined(formik.touched.optionalReference) &&
              !isUndefined(formik.errors.optionalReference)
            }
            helperText={
              !isUndefined(formik.touched.optionalReference) &&
              !isUndefined(formik.errors.optionalReference)
            }
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
          >
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  )
}

export default withLayout(Index)
