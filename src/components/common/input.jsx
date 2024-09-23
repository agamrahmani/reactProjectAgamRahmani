import React from 'react';

function Input({ label, error, isValid, ...rest }) {  
    return (
        <div className="mb-3">
            <label htmlFor={rest.name} className="form-label">
                {label}
                {rest.required && <span className="text-danger ms-1">*</span>}
            </label>
            <input 
                {...rest}
                type={rest.type || "text"}
                className={["form-control", error && "is-invalid", isValid && 'is-valid'].filter(Boolean).join(" ")}
                id={rest.name}
            />

            <div className="invalid-feedback">{error}</div>
        </div>

    
    );
}

export default Input;
