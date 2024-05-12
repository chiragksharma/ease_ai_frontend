import React,{useState} from 'react';
import "@pages/sidepanel/static_components/button/index.scss"
import LoadingAnimation from '@assets/animations/loading_wheel_grey.json';
import Lottie from 'lottie-react';

interface ButtonProps {
    title: string;
    onClick?: () => void;
    loading: boolean;
  }

const Button: React.FC<ButtonProps> = ({ 
    title,
    onClick = () => {}, // default to a no-op function if not provided
    loading,
}) => {
  const loadingStyle = {
    height: 50,
    width: 50,
  };
 
  return (
 
    <div
    onClick={onClick}
    className={`button-container ${loading ? 'is-loading' : ''}`}
    style={{ pointerEvents: loading ? 'none' : 'auto' }}

    >
    {title}
    {loading && <span className="loading-wheel">
       <Lottie style={loadingStyle} animationData={LoadingAnimation} loop={true} />
      </span>}
  </div>

)};

export default Button;