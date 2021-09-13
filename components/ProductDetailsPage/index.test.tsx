import React from 'react'
import { mount } from 'enzyme'
import { describe, it, expect } from '@jest/globals'
import ProductDetails from '.'

jest.mock('../../utils/dayjs', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    toDate: jest.fn(() => '2021-09-12T20:08:40.642Z')
  }))
}))

describe('<ProductDetails />', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<ProductDetails />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should contain the title Este es tu detalle', () => {
    const wrapper = mount(<ProductDetails />)

    expect(wrapper.text()).toContain('Este es tu detalle')
  })
})
