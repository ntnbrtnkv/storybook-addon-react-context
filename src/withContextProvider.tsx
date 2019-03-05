import * as React from 'react';

import { Option } from './types/Option';
import { ReactProvider } from './Provider';

interface ReactProviderProps {
  options: Option[];
  provider: React.Provider<any>;
  callback?: (option: Option) => void;
}

export const withContextProvider = (props: ReactProviderProps) => (
  story: Function
) => {
  return <ReactProvider {...props}>{story()}</ReactProvider>;
};
