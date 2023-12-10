import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../Pedidos.css';
import BodyObserver from './../../../observer/BodyObserver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusDots from './status/StatusDots';
import Legend from './status/Legenda';

const PedidosTable = React.forwardRef(({ keyProp, editarPedido }, ref) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const handleBodyClassChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pedido/getAll');
      setPedidos(response.data);
      setFilteredPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const excluirPedido = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pedido/${id}`);
      toast.success('Pedido Excluído com Sucesso!');
      recarregarTabela();
    } catch (error) {
      console.error('Erro ao excluir o pedido:', error);
      toast.error(error.response.data);
    }
  };

  const handleInputChange = (event) => {
    const termoBusca = event.target.value;
    setSearchTerm(termoBusca);

    const pedidosFiltrados = pedidos.filter((pedido) =>
      pedido.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    setFilteredPedidos(pedidosFiltrados);
  };

  const recarregarTabela = () => {
    carregarPedidos();
  };

  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    carregarPedidos();
  }, [keyProp, ref]);

  React.useImperativeHandle(ref, () => ({
    getPedido: () => pedido,
  }));

  const editarPedidoFunc = async (pedido) => {
    pedido = await atualizarPedido(pedido.id);
    setPedido(pedido);
    setTimeout(() => {
      editarPedido();
    }, 0);
  };

  const atualizarPedido = async (id) => { 
    try {
      const response = await axios.get(`http://localhost:3000/pedido/gerenteFuncionarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o pedido:', error);
    }
  }

  return (
    <div>
      <Legend />
      <InputGroup className="mb-1 input-pedido">
        <FormControl 
          placeholder="Buscar pedido pelo nome..." 
          value={searchTerm}
          onChange={handleInputChange}
        />
      </InputGroup>
      <BodyObserver onBodyClassChange={handleBodyClassChange} />
      <Table striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
        <thead>
          <tr>
            <th className="text-center col-md-2 small-font">Solicitante</th>
            <th className="text-center col-md-2 small-font">Data do Pedido</th>
            <th className="text-center col-md-3 small-font">Valor</th>
            <th className="text-center col-md-3 small-font">Delivery</th>
            <th className="text-center col-md-1 small-font">Status</th>
            <th className="text-center col-md-1 small-font">Ação</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td className="text-center small-font">{pedido.usuario.nome}</td>
              <td className="text-center small-font">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
              <td className="text-center small-font">{pedido.valor_total}</td>
              <td className="text-center small-font">{pedido.endereco ? "Sim" : "Não"}</td>
              <td className="text-center"> <StatusDots status={pedido.status} /></td>
              <td className="text-center small-font">
                <Button
                  className="small-button btn-pedidos mr-2"
                  variant="primary"
                  onClick={() => editarPedidoFunc(pedido)}
                >
                  Editar
                </Button>
                <Button
                  className="small-button"
                  variant="danger"
                  onClick={() => excluirPedido(pedido.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default PedidosTable;
