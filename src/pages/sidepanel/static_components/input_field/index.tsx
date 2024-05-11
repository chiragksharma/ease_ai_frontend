import React,{ ChangeEvent } from 'react';
import "@pages/sidepanel/static_components/input_field/index.scss"

interface InputProps {
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

const InputField: React.FC<InputProps> = ({ 
    placeholder,
    onChange,
}) => (
 
    <div
    className="input-field-container"
    >
    <input type="text" className="custom-input" placeholder={placeholder} onChange={onChange} />
  </div>

);

export default InputField;