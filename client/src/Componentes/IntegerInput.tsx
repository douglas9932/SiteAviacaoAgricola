import React, { ChangeEvent, FC } from 'react';
// import styles from './IntegerInput.module.css'; // Import your CSS module for styling

interface IntegerInputProps {
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  max?: number;
  min?: number;
  placeholder?: string;
  className?: string;
  style?: {};
}

const IntegerInput: FC<IntegerInputProps> = ({ value, onChange, max, min, placeholder, className, style }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) { // Regular expression to allow only digits
      if ((max !== undefined && +value > max) || (min !== undefined && +value < min)) {
        return;
      }
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      className={className}
      style={style}
      placeholder={placeholder}
    />
  );
};

export default IntegerInput;
