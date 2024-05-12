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
  const [isLoading, setIsLoading] = useState(loading);
  const loadingStyle = {
    height: 50,
    width: 50,
  };
  const handleClick = () =>{
    if (!isLoading) {
      setIsLoading(true);
      onClick();
      // setTimeout(() => setIsLoading(false), 9000); // Loading effect for 1 second
    }
  }
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