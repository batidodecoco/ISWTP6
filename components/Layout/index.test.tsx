import React from 'react'
import { mount } from 'enzyme'
import { describe, it, expect } from '@jest/globals'
import Layout from '.'

jest.mock('next/head', () => ({
  __esModule: true,
  default: () => <div />
}))

describe('<Layout />', () => {
  it('should render the children passed', () => {
    const wrapper = mount(
      <Layout>
        <div id='children'>Hello</div>
      </Layout>
    )

    expect(wrapper.find('div#children').text()).toEqual('Hello')
  })
})
