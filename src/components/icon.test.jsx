import React from 'react'
import renderer from 'react-test-renderer'
import { AlertIcon } from './icon'

test('The component renders correctly', () => {
  const comp = renderer.create(
    <AlertIcon />
  )

  expect(comp).toMatchSnapshot()
})
