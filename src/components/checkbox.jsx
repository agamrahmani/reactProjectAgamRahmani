import React from 'react';

function Checkbox({ label, error, ...rest }) {

    return (
    <div className="mb-3 p-3">
        <div className="form-check p-3 m-2">
            <input 
                {...rest}
                type="checkbox"
                className={"fs-3 form-check-input"}
                id={rest.name}
            />

            <label htmlFor={rest.name} className="form-check-label fs-5">
                {label}
            </label>

            <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
}

export default Checkbox;
