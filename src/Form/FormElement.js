import React from 'react';

const FormElement = props => {
  const {labelText, inputType, inputID, inputName, inputPlaceholder, inputValue, validateInput, inputChange, inputError} = props;

 if (inputType === 'submit') {
   return (
     <div className="form__element">
       <input
         type={inputType}
         className="input input_submit"
         id={inputID}
         name={inputName}
         value={inputValue}
       />
     </div>
   );
 } else {
   return (
     <div className="form__element">
       <label className="label" htmlFor={inputID}>{labelText}</label>

       <input
         type={inputType}
         className={`input ${inputError}`}
         id={inputID}
         name={inputName}
         placeholder={inputPlaceholder}
         onChange={inputChange}
         onBlur={validateInput}
         value={inputValue}
       />
     </div>
   );
 }
};

export default FormElement;
