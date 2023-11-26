import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function CpfCnpjInput({ formDataSignUp, handleFormSignUpChange }) {
  const [mask, setMask] = useState(true); 

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove não dígitos
    const isCpf = inputValue.length <= 11;

    setMask(isCpf ? true : false);
    handleFormSignUpChange(e);
  };

  return (
    mask ?
    <InputMask
      type="text"
      name="cpf_cnpj"
      value={formDataSignUp.cpf_cnpj}
      placeholder="CPF/CNPJ"
      mask='999.999.999-999'
      maskChar={null}
      onChange={handleChange}
    />
    
    :

    <InputMask
      type="text"
      name="cpf_cnpj"
      value={formDataSignUp.cpf_cnpj}
      placeholder="CPF/CNPJ"
      mask='99.999.999/9999-99'
      maskChar={null}
      onChange={handleChange}
    />
  );
}

export default CpfCnpjInput;
