import { describe, it } from '@jest/globals'
import AddressSchema from '.'

describe('AddressSchema', () => {
  it('should pass if all required fields are valid', async () => {
    const details = {
      street: '123 Main St',
      number: 123,
      city: 'Córdoba'
    }

    expect(AddressSchema.isValidSync(details)).toBe(true)
  })

  it('should throw if street is not found', async () => {
    const details = {
      number: 123,
      city: 'Córdoba'
    }

    expect(AddressSchema.isValidSync(details)).toBe(false)
  })

  it('should throw if number is not valid', async () => {
    const details = {
      street: '123 Main St',
      number: 100000,
      city: 'Córdoba'
    }

    expect(AddressSchema.isValidSync(details)).toBe(false)
  })

  it('should pass if all fields are valid', async () => {
    const details = {
      street: '123 Main St',
      number: 123,
      floor: 5,
      apartment: 'A',
      city: 'Córdoba',
      optionalReference: 'Alguna referencia'
    }

    expect(AddressSchema.isValidSync(details)).toBe(true)
  })
})
