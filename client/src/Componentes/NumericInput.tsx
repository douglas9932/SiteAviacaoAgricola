import React, { useState } from 'react';

interface NumericInputProps {
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const NumericInput: React.FC<NumericInputProps> = ({ value,setValue, disabled, className, required = false }) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    newValue = newValue.replace(',','.');
    const cleanedValue = newValue.replace(/[^0-9.]/g, '');

    if (cleanedValue === '') {
      if (required) {
        setError('Campo obrigatório');
      } else {
        setError('');
      }
      setInputValue(cleanedValue);
      setValue("0");
      return;
    }

    const numericValue = parseFloat(cleanedValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      value = cleanedValue.toString();
      setInputValue(cleanedValue);
      setValue(cleanedValue.toString());
      setError('');
    } else {
      setError('Por favor, insira um número válido maior ou igual a 0');
    }
  };

//   if(!disabled){
//     disabled = true;
//   }

  return (
    <div>
      <input 
        disabled={disabled}
        type="text" 
        className={className}
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Digite um número"
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default NumericInput;
