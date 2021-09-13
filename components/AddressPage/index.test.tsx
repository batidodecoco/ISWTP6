import React from 'react'
import { mount } from 'enzyme'
import { describe, it, expect } from '@jest/globals'
import Address from '.'
import { act } from 'react-dom/test-utils'

describe('<Address />', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<Address />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should contain the title Ingresá tu dirección', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.text()).toContain('Ingresá tu dirección')
  })

  it('should contain an Address field to write your address', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('input[name="street"]').length).toBe(1)
  })

  it('should contain an Address Number field to write your address number', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('input[name="number"]').length).toBe(1)
  })

  it('should contain a Floor field to write your floor', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('input[name="floor"]').length).toBe(1)
  })

  it('should contain an Address Number field to write your address number', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('input[name="number"]').length).toBe(1)
  })

  it('should contain a City select field to select your city', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('select[name="city"]').length).toBe(1)
  })

  it('should be able to select a City when user clicks upon the select field', () => {
    const wrapper = mount(<Address />)

    act(() => {
      const citySelect = wrapper.find('select[name="city"]')

      citySelect.simulate('change', {
        target: {
          value: '1'
        }
      })
    })

    expect(wrapper.find('select[name="city"]').props().value).toBe('1')
  })

  it('should contain a Optional Reference textarea to write an optional reference', () => {
    const wrapper = mount(<Address />)

    expect(wrapper.find('textarea[name="optionalReference"]').length).toBe(1)
  })
})
