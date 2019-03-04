# React Context Addon

[![npm version](https://badge.fury.io/js/storybook-addon-react-context.svg)](https://badge.fury.io/js/storybook-addon-react-context)
![npm](https://img.shields.io/npm/dt/storybook-addon-react-context.svg)
[![CircleCI](https://circleci.com/gh/ntnbrtnkv/storybook-addon-react-context.svg?style=shield)](https://circleci.com/gh/ntnbrtnkv/storybook-addon-react-context)
![David](https://img.shields.io/david/ntnbrtnkv/storybook-addon-react-context.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ntnbrtnkv/storybook-addon-react-context.svg)

---

#### Installation
```bash
yarn add storybook-addon-react-context --dev
```

#### Add to .storybook/addons.js

```javascript
import 'storybook-addon-react-context/dist/register';
```

#### addDecorator to .storybook/config.js
```javascript
import { addDecorator } from '@storybook/react';
import { withContextProvider } from 'storybook-addon-react-context';

import { ReactContextProvider } from './path/to/file';

addDecorator(withContextProvider({
  provider: ReactContextProvider,
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
```

This is used for displaying in the Storybook UI.


#### Contributing

`yarn`

`yarn build`

`yarn example`

#### Thanks
Thanks to [Carlos](https://github.com/echoulen) for making [storybook-addon-styled-component-theme](https://github.com/echoulen/storybook-addon-styled-component-theme) and upon which this library was based on top of.