import {Select as AntSelect, SelectProps as AntSelectProps} from 'antd';
import {SelectValue as AntSelectValue} from 'antd/lib/select';

export type SelectValue = AntSelectValue;
export type SelectProps<VT> = AntSelectProps<VT>;
export const Select = AntSelect;
