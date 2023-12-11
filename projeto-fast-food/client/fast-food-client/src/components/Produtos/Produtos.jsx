import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProdutosTable from './tabela/TabelaProdutos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import FormEdicaoCadastro from './modal-cadastro-edicao/FormCadastroEdicao';
import './Produtos.css';
import BodyObserver from '../observer/BodyObserver';

const GridProdutos = () => {
  const [showModal, setShowModal] = useState(false);
  const [criacaoEdicao, setCriacaoEdicao] = useState("Cadastro");
  const [tableKey, setTableKey] = useState(0);
  const formRef = useRef();
  const ProdutoRef = useRef();
  const [produtoModal, setProdutoModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleBodyClassChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    if (produtoModal !== null) {
      setCriacaoEdicao("Edição");
    } else {
      setCriacaoEdicao("Cadastro");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const editarProduto = () => { 
    setProdutoModal(ProdutoRef.current.getProduto());
    handleOpenModal();
  }

  const criarProduto = () => {
    setProdutoModal(null);
    handleOpenModal();
  };

  const handleSave = async () => {
    const values = formRef.current.getFormValues();
    const formValido = validarFormulario(values);

    if (!formValido) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      if (produtoModal !== null) { 
        await axios.put('http://localhost:3000/produto/' + produtoModal.id, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post('http://localhost:3000/produto/save', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      toast.success('Produto salvo com sucesso!');
      setTableKey((prevKey) => prevKey + 1);
      handleCloseModal();
    } catch (error) {
      toast.error(`Erro ao salvar o Produto: ${error.message}`);
      console.error('Erro ao salvar o Produto:', error);
    }
  };

  const validarFormulario = (values) => {
    const camposObrigatorios = [
      'nome',
      'valor',
      'categoria',
      'ativo',
    ];

    for (const campo of camposObrigatorios) {
      if (values[campo] === undefined || values[campo] === null || values[campo] === '') {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="text">
      <BodyObserver onBodyClassChange={handleBodyClassChange} />
      Produtos
      <div className="mt-3">
        <Button className="mb-3 btn-produtos" variant="success" onClick={criarProduto}>
          Novo Produto
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{criacaoEdicao} de Produtos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEdicaoCadastro ref={formRef} produto={produtoModal} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
        <ProdutosTable key={tableKey} ref={ProdutoRef} editarProduto={editarProduto} />
      </div>
    </div>
  );
};

export default GridProdutos;
