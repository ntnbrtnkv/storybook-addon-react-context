import * as React from 'react';
import addons from '@storybook/addons';

import { ADDON_ID, PANDEL_ID } from './constants';
import { Container } from './Container';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANDEL_ID, {
    title: 'Context',
    render: ({ active }) => {
      return (
        <Container channel={addons.getChannel()} api={api} active={active} />
      );
    }
  });
});
