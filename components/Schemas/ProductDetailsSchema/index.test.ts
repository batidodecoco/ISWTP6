import { describe, it } from '@jest/globals'
import DetailsSchema from '.'
import dayjs from '../../../utils/dayjs'

describe('DetailsSchema', () => {
  it('should pass when paymentMethod is cash and is a valid cashAmount', async () => {
    const details = {
      paymentMethod: 'cash',
      arrivalTime: 'asap',
      cashAmount: 2220
    }

    expect(DetailsSchema.isValidSync(details)).toBe(true)
  })

  it('should throw when paymentMethod is cash and is not a valid cashAmount', async () => {
    const details = {
      paymentMethod: 'cash',
      arrivalTime: 'asap',
      cashAmount: 1800
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should throw when paymentMethod is cash and cashAmount is undefined', async () => {
    const details = {
      paymentMethod: 'cash',
      arrivalTime: 'asap'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should throw when paymentMethod is visa and cardExpiry has an invalid month', () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '4111111111111111',
      cardExpiry: '13/2022',
      cardCvc: '123',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should pass when paymentMethod is visa and all card inputs are valid', async () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '4111111111111111',
      cardExpiry: '12/2022',
      cardCvc: '123',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(true)
  })

  it('should throw when paymentMethod is visa but the card number is null', async () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '',
      cardExpiry: '12/2022',
      cardCvc: '123',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should throw when paymentMethod is visa but the card number is mastercard', async () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '3111111111111111',
      cardExpiry: '12/2022',
      cardCvc: '123',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should throw when paymentMethod is visa but the card expiry is not valid', async () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '4111111111111111',
      cardExpiry: '12/2020',
      cardCvc: '123',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should throw when paymentMethod is visa but the card cvc is not valid', async () => {
    const details = {
      paymentMethod: 'visa',
      arrivalTime: 'asap',
      cardNumber: '4111111111111111',
      cardExpiry: '12/2022',
      cardCvc: '12',
      cardHolderName: 'John'
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should pass when arrivalTime is let-me-decide and arrivalDate is a valid date', async () => {
    const details = {
      paymentMethod: 'cash',
      cashAmount: 2225,
      arrivalTime: 'let-me-decide',
      arrivalDate: dayjs().add(1, 'day').toDate()
    }

    expect(DetailsSchema.isValidSync(details)).toBe(true)
  })

  it('should fail when arrivalTime is let-me-decide and arrivalDate is not a valid date', async () => {
    const details = {
      paymentMethod: 'cash',
      arrivalTime: 'let-me-decide',
      arrivalDate: dayjs().subtract(1, 'day').toDate()
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })

  it('should fail when arrivalTime is let-me-decide and arrivalDate is more than 1 week after today', async () => {
    const details = {
      paymentMethod: 'cash',
      arrivalTime: 'let-me-decide',
      arrivalDate: dayjs().add(8, 'day').toDate()
    }

    expect(DetailsSchema.isValidSync(details)).toBe(false)
  })
})
