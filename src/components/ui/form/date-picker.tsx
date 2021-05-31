import {DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps} from 'antd';
import {MonthPickerProps as AntMonthPickerProps, RangePickerProps as AntRangePickerProps, WeekPickerProps as AntWeekPickerProps} from 'antd/lib/date-picker';

export type DatePickerProps = AntDatePickerProps;
export type MonthPickerProps = AntMonthPickerProps;
export type WeekPickerProps = AntWeekPickerProps;
export type RangePickerProps = AntRangePickerProps;
export const DatePicker = AntDatePicker;
export const WeekPicker = AntDatePicker.WeekPicker;
export const MonthPicker = AntDatePicker.MonthPicker;
export const YearPicker = AntDatePicker.YearPicker;
export const RangePicker = AntDatePicker.RangePicker;
export const TimePicker = AntDatePicker.TimePicker;
export const QuarterPicker = AntDatePicker.QuarterPicker;
