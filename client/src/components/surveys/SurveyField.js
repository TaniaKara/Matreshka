import React from 'react';


export default ({ input, label, meta: {error, touched} }) => {
    console.log(error);
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
            <div>
            {touched && error}
            </div>
        </div>
    );
};