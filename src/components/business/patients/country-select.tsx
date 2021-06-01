import React, {useMemo} from 'react';
import {Select, SelectProps, SelectValue} from '../../ui/form/select';
import {useCountries} from '../use-countries';

export type CountrySelectProps<VT> = SelectProps<VT>;

export function CountrySelect<VT extends SelectValue = SelectValue>(selectProps: CountrySelectProps<VT>) {
    const {countries} = useCountries();
    const options = useMemo(() => {
        return !countries ? undefined : Object.values(countries).map(({code, name}) => ({value: code, label: name}));
    }, [countries]);

    return (
        <Select
            {...selectProps}
            loading={!options}
            options={options}
            showSearch={true}
            optionFilterProp='label'
            allowClear={!!options}
        />
    );
}
