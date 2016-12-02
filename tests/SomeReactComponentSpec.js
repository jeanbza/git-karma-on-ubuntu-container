import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import SomeReactComponent from '../src/SomeReactComponent'

describe('SomeReactComponent', function () {
  const renderer = ReactTestUtils.createRenderer()

  it('has the correct text', function () {
    renderer.render(<SomeReactComponent />)
    const result = renderer.getRenderOutput()
    expect(result.type).toBe('div')
    expect(result.props.children).toEqual('Hello from SomeReactComponent');
  })
})