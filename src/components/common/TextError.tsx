import React, {ReactNode} from 'react';

function TextError(props: { children: ReactNode }) {
    return (
        <small className="text-danger extend">{props.children}</small>
    );
}

export default TextError;