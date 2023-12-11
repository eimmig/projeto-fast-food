import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PedidosTable from './tabela/TabelaPedidos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import FormEdicaoCadastro from './modal-cadastro-edicao/FormCadastroEdicao';
import './Pedidos.css';
import BodyObserver from "../observer/BodyObserver";

const GridPedidos = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const formRef = useRef();
  const pedidoRef = useRef();
  const [pedidoModal, setPedidoModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const criacaoEdicao = "Edição";

  const handleBodyClassChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const editarPedido = () => { 
    setPedidoModal(pedidoRef.current.getPedido());
    handleOpenModal();
  }


  const handleSave = async () => {
    const values = formRef.current.getFormValues();
    const formValido = validarFormulario(values);

    if (!formValido) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      if (pedidoModal !== null) { 
        await axios.put('http://localhost:3000/pedido/' + pedidoModal.id, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } 
      toast.success('Pedido salvo com sucesso!');
      setTableKey((prevKey) => prevKey + 1);
      handleCloseModal();
    } catch (error) {
      toast.error(`Erro ao salvar o Pedido: ${error.message}`);
      console.error('Erro ao salvar o Pedido:', error);
    }
  };

  const validarFormulario = (values) => {
    const camposObrigatorios = [
      'status'
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
      Pedidos
      <div className="mt-3">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{criacaoEdicao} de Pedidos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEdicaoCadastro ref={formRef} pedido={pedidoModal} />
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
        <PedidosTable key={tableKey} ref={pedidoRef} editarPedido={editarPedido} />
      </div>
    </div>
  );
};

export default GridPedidos;
