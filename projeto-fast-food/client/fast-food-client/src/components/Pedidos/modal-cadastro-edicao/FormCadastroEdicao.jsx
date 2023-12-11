import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';


const FormEdicaoCadastro = React.forwardRef(({ pedido }, ref) => {
  const [formValues, setFormValues] = useState({
    status: "",
  });

  React.useImperativeHandle(ref, () => ({ 
    getFormValues: () => formValues,
  }));


  useEffect(() => {
      if (pedido) {
      setFormValues({
        ...pedido
      });
    }
  }, [pedido]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelecaoMultiplaChange = (selectedOptions) => {
    setFormValues({
      ...formValues,
      funcionarios: selectedOptions,
    });
  };

  return (
        <Form className="my-4">
          <FloatingLabel className="mb-2" controlId="status" label="Status">
            <Form.Select
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione o status</option>
              <option value="LIDO">Lido</option>
              <option value="EM_PREPARACAO">Em Preparação</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENTREGUE">Entregue</option>
              <option value="NAO_LIDO">Não Lido</option>
            </Form.Select>
          </FloatingLabel>
        </Form>
  );
});

export default FormEdicaoCadastro;
