import { addDecorator, configure } from '@storybook/react';

import { withContextProvider } from '../dist';
import { Provider } from '../example/Context';

addDecorator(withContextProvider({
  provider: Provider,
  options: [
    {
      value: '1',
      label: 'one'
    },
    {
      value: '2',
      label: 'two'
    }
  ]
}));

// automatically import all files ending in *.stories.js
// @ts-ignore
const req = require.context('../', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
