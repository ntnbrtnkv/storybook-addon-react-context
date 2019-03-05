import { addDecorator, configure } from '@storybook/react';

import { withContextProvider } from '../dist';
import { Provider } from '../example/Context';

function cb(option) {
  console.log(`Callback triggered with option: "${option.value}" - "${option.label}"`);
}

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
  ],
  callback: cb
}));

// automatically import all files ending in *.stories.js
// @ts-ignore
const req = require.context('../', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
