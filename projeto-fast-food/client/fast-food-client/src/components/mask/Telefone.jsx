import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function TelefoneMask({ formDataSignUp, handleFormSignUpChange }) {
  const [mask, setMask] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); 

   
    let newMask = '';
    if (inputValue.length <= 10) {
      newMask = '(99) 9999-99999'; 
    } else {
      newMask = '(99) 9 9999-9999'; 
    }

    setMask(newMask);
    handleFormSignUpChange(e);
  };

  return (
    <InputMask
      type="text"
      name="telefone"
      value={formDataSignUp.telefone}
      placeholder="Telefone"
      mask={mask}
      maskChar={null}
      onChange={handleChange}
    />
  );
}

export default TelefoneMask;
