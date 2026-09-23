/**
 * @format
 */

import React from 'react';
import { Pressable, Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { SettingsScreen } from '../src/screens/SettingsScreen';
import { light } from '../src/theme';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('settings form disables save until all fields are valid', () => {
  const component = ReactTestRenderer.create(
    <SettingsScreen colors={light} />,
  );

  const saveButton = component.root
    .findAllByType(Pressable)
    .find(button =>
      button.findAllByType(Text).some(textNode => textNode.props.children === 'Save changes'),
    );

  expect(saveButton).toBeTruthy();
  expect(saveButton?.props.disabled).toBe(true);
});
