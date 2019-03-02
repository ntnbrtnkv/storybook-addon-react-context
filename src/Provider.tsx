import * as React from 'react';
import addons from '@storybook/addons';
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
  withState
} from 'recompose';

import { Option } from './types/Option';
import { SET_PROVIDER_VALUE, SET_OPTIONS } from './constants';

export interface Props {
  options: Option[];
  provider: React.Provider<any>;
  children: React.ReactChild;
}

interface State {
  selectedOption: Option;
  selectOption: (option: Option) => void;
}

type BaseComponentProps = Props & State;

const BaseComponent: React.SFC<BaseComponentProps> = (props) => {
  console.log(props);
  const { selectedOption, provider: Provider, children } = props;
  return <Provider value={selectedOption.value}>{children}</Provider>;
};

export const ReactProvider = compose<BaseComponentProps, Props>(
  withState('selectedOption', 'selectOption', null),
  lifecycle<BaseComponentProps, BaseComponentProps>({
    componentDidMount() {
      const { selectOption, options } = this.props;
      const channel = addons.getChannel();
      channel.on(SET_PROVIDER_VALUE, selectOption);
      channel.emit(SET_OPTIONS, options);
    },
    componentWillUnmount() {
      const { selectOption } = this.props;
      const channel = addons.getChannel();
      channel.removeListener(SET_PROVIDER_VALUE, selectOption);
    }
  }),
  branch<BaseComponentProps>((props) => !props.selectedOption, renderNothing)
)(BaseComponent);
