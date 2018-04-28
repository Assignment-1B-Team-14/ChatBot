import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  jest.mock(`Picker`, () => {
    const React = require('react');
  });
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
