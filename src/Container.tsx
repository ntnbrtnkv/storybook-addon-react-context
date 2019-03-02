import * as React from 'react';
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
  withHandlers,
  withState
} from 'recompose';

import { Option } from './types/Option';
import { SET_PROVIDER_VALUE, SET_OPTIONS, QUERY_PARAM } from './constants';
import { EventEmitter } from 'events';

export interface Props {
  channel: EventEmitter;
  api: {
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback: (data: any) => void): void;
    setQueryParams(object: Record<string, any>): void;
    getQueryParam(paramName: string): string;
  };
  active: boolean;
}

interface State {
  selectedOption: Option;
  selectOption: (option: Option) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
}

interface Handlers {
  onChange: (value: any) => void;
  onReceiveOptions: (options: Option[]) => void;
}

type BaseComponentProps = Props & State & Handlers;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({
  onChange,
  options,
  selectedOption
}) => (
  <select value={selectedOption.value} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option value={value} key={value}>
        {label}
      </option>
    ))}
  </select>
);

export const Container = compose<BaseComponentProps, Props>(
  withState('selectedOption', 'selectOption', null),
  withState('options', 'setOptions', []),
  withHandlers<Props & State, Handlers>({
    onChange: ({ channel, selectOption, api, options }) => (e) => {
      const value = e.target.value;
      const option = options.find((i) => i.value === value);
      selectOption(option);
      api.setQueryParams({ [QUERY_PARAM]: option.label });
      channel.emit(SET_PROVIDER_VALUE, option);
    },
    onReceiveOptions: ({ selectOption, setOptions, channel, api }) => (
      newOptions: Option[]
    ) => {
      const currrentLabel = api.getQueryParam(QUERY_PARAM);
      setOptions(newOptions);
      if (newOptions.length > 0) {
        const option =
          newOptions.find((i: Option) => i.label === currrentLabel) ||
          newOptions[0];
        selectOption(option);
        channel.emit(SET_PROVIDER_VALUE, option);
      }
    }
  }),
  lifecycle<BaseComponentProps, BaseComponentProps>({
    componentDidMount() {
      const { channel, onReceiveOptions } = this.props;
      channel.on(SET_OPTIONS, onReceiveOptions);
    },
    componentWillUnmount() {
      const { channel, onReceiveOptions } = this.props;
      channel.removeListener(SET_OPTIONS, onReceiveOptions);
    }
  }),
  branch<BaseComponentProps>(
    ({ selectedOption, active }) => !selectedOption || !active,
    renderNothing
  )
)(BaseComponent);
