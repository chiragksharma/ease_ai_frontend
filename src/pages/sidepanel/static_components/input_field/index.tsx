import React from 'react';
import "@pages/sidepanel/static_components/input_field/index.scss"

interface InputProps {
    placeholder: string;
  }

const InputField: React.FC<InputProps> = ({ 
    placeholder,
   
}) => (
 
    <div
    className="input-field-container"
    >
    <input type="text" className="custom-input" placeholder={placeholder} />
  </div>

);

export default InputField;