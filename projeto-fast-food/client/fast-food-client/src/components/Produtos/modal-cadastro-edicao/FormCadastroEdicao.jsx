import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';


const FormEdicaoCadastro = React.forwardRef(({ produto }, ref) => {
  const [formValues, setFormValues] = useState({
    nome: '',
    valor: 0,
    categoria: '',
    ativo: '',
  });

  React.useImperativeHandle(ref, () => ({ 
    getFormValues: () => formValues,
  }));

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/category/getAll')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Erro ao buscar categorias:', error));
  
    if (produto) {
      produto.categoria = produto.categoria.id
      produto.status = produto.is_ativo;
      setFormValues({
        ...produto
      });
    }
  }, [produto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
        <Form className="my-4">
          <FloatingLabel className="mb-2" controlId="nome" label="Nome do Produto">
            <Form.Control
              type="text"
              placeholder="Nome"
              name="nome"
              value={formValues.nome}
              onChange={handleInputChange}
              maxLength={200}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="orcamento" label="Valor">
            <Form.Control
              type="number"
              placeholder="Valor"
              name="valor"
              value={formValues.valor}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="risco" label="status">
            <Form.Select
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione o status</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="idCategoria" label="Categoria">
            <Form.Select
              name="idCategoria"
              value={formValues.categoria}
              onChange={handleInputChange}
            >
              <option value="">Selecione a Categoria</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form>
  );
});

export default FormEdicaoCadastro;
