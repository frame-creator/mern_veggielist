import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = props => {
    return (
        <div className={`${props.asOverlay && 'spinner__overlay'}`}>
         <div className="loading"></div>
        </div>
    );
};
export default LoadingSpinner;