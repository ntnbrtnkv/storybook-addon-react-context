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
  callback?: (option: Option) => void;
}

interface State {
  selectedOption: Option;
  selectOption: (option: Option) => void;
}

type BaseComponentProps = Props & State;

const BaseComponent: React.SFC<BaseComponentProps> = ({
  selectedOption,
  provider: Provider,
  children
}) => <Provider value={selectedOption.value}>{children}</Provider>;

export const ReactProvider = compose<BaseComponentProps, Props>(
  withState('selectedOption', 'selectOption', null),
  lifecycle<BaseComponentProps, BaseComponentProps>({
    componentDidMount() {
      const { selectOption, options, callback } = this.props;
      const channel = addons.getChannel();
      channel.on(SET_PROVIDER_VALUE, selectOption);
      if (callback) {
        channel.on(SET_PROVIDER_VALUE, callback);
      }
      channel.emit(SET_OPTIONS, options);
    },
    componentWillUnmount() {
      const { selectOption, callback } = this.props;
      const channel = addons.getChannel();
      channel.removeListener(SET_PROVIDER_VALUE, selectOption);
      if (callback) {
        channel.removeListener(SET_PROVIDER_VALUE, callback);
      }
    }
  }),
  branch<BaseComponentProps>((props) => !props.selectedOption, renderNothing)
)(BaseComponent);
