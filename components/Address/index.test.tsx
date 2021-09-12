import React from 'react'
import { mount } from 'enzyme'
import { describe, it, expect } from '@jest/globals'
import Address from '.'

describe('<Address />', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<Address />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should contain the title Ingresá tu dirección', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.text()).toContain('Ingresá tu dirección')
  })
})
