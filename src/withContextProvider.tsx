import * as React from 'react';

import { Option } from './types/Option';
import { ReactProvider } from './Provider';

interface ReactProviderProps {
  options: Option[];
  provider: React.Provider<any>;
}

export const withContextProvider = ({
  provider,
  options
}: ReactProviderProps) => (story: () => JSX.Element) => {
  return (
    <ReactProvider provider={provider} options={options}>
      {story()}
    </ReactProvider>
  );
};
