import React from 'react';
import "@pages/sidepanel/static_components/button/index.scss"

interface ButtonProps {
    title: string;
    onClick?: () => void;
  }

const Button: React.FC<ButtonProps> = ({ 
    title,
    onClick = () => {}, // default to a no-op function if not provided
}) => (
 
    <div
    onClick={onClick}
    className="button-container"
  >
    {title}
  </div>

);

export default Button;