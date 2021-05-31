import React, {PropsWithChildren, useContext, useEffect} from 'react';
import {Form, FormProps} from './index';

export interface ToggleFormContextProps {
    editable: boolean;
}

export const ToggleFormContext = React.createContext<ToggleFormContextProps>({
    editable: false,
});

export interface ToggleFormProps extends FormProps {
    editable: boolean;
}

export function ToggleForm({children, editable, ...formProps}: PropsWithChildren<ToggleFormProps>) {
    const initialValuesUpdated = editable ? true : formProps.initialValues;
    useEffect(() => formProps.form?.resetFields(), [formProps.form, initialValuesUpdated]);
    return (
        <ToggleFormContext.Provider value={{editable}}>
            <Form {...formProps}>{children}</Form>
        </ToggleFormContext.Provider>
    );
}

export interface ToggleElementProps {
    renderView: React.ReactElement | ((context: ToggleFormContextProps, props: any) => React.ReactElement);
    renderInput: React.ReactElement | ((context: ToggleFormContextProps, props: any) => React.ReactElement);
}

export function ToggleElement({renderView, renderInput, ...inputProps}: ToggleElementProps) {
    const context = useContext(ToggleFormContext);
    if (context.editable) {
        return typeof renderInput === 'function'
            ? renderInput(context, inputProps)
            : React.cloneElement(renderInput as any, inputProps);
    } else {
        return typeof renderView === 'function'
            ? renderView(context, inputProps)
            : React.cloneElement(renderView as any, {value: (inputProps as any).value});
    }
}
