import React, {useState} from 'react';

export function catchAsyncError(component: React.Component, err: any) {
    component.setState(() => {
        throw err;
    });
}

export function useCatchAsyncError() {
    const [/* state */, setState] = useState();
    return (err: Error) => {
        setState(() => {
            throw err;
        });
    };
}
