import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../Pedidos.css';
import BodyObserver from '../../observer/BodyObserver';
import 'react-toastify/dist/ReactToastify.css';
import StatusDots from './status/StatusDots';
import Legend from './status/Legenda';

const PedidosTable = React.forwardRef(({ keyProp, editarPedido }, ref) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [expandedRowData, setExpandedRowData] = useState(null);

  const handleBodyClassChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pedido/getAllByEmpresa/' + localStorage.getItem('companyId'));
      setPedidos(response.data);
      setFilteredPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
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

  useEffect(() => {
    carregarPedidos();
  }, [keyProp, ref]);

  React.useImperativeHandle(ref, () => ({
    getPedido: () => pedido,
  }));

  const editarPedidoFunc = async (pedido) => {
    pedido = await atualizarPedido(pedido.id);
    debugger;
    setPedido(pedido);
    setTimeout(() => {
      editarPedido();
    }, 0);
  };

  const visualizarPedido = (pedido) => {
    debugger;
    setIsRowExpanded(true);

    if (!isRowExpanded) {
      setExpandedRowData({endereco: pedido.endereco ? pedido.endereco.rua + "-" + pedido.endereco.numero + "-"  + pedido.endereco.bairro + "-" + pedido.endereco.cidade + "-"  + pedido.endereco.estado : "Retirar no local", idPedido : pedido.id});
    } else {
      setExpandedRowData(null);
    }
  };

  const atualizarPedido = async (id) => { 
    try {
      const response = await axios.get(`http://localhost:3000/pedido/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o pedido:', error);
    }
  };

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
          {filteredPedidos.map((pedidoMap) => (
            <React.Fragment key={pedidoMap.id}>
              <tr>
                <td className="text-center small-font">{pedidoMap.usuario ? pedidoMap.usuario.nome : ""}</td>
                <td className="text-center small-font">{new Date(pedidoMap.data_pedido).toLocaleDateString()}</td>
                <td className="text-center small-font">R$ {pedidoMap.valor_total}</td>
                <td className="text-center small-font">{pedidoMap.endereco ? "Delivery" : "Retirar no local"}</td>
                <td className="text-center"> <StatusDots status={pedidoMap.status} /></td>
                <td className="text-center small-font">
                  <Button
                    className="small-button btn-pedidos mr-2"
                    variant="primary"
                    onClick={() => editarPedidoFunc(pedidoMap)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="small-button"
                    variant="danger"
                    onClick={() => visualizarPedido(pedidoMap)}
                  >
                    Visualizar
                  </Button>
                </td>
              </tr>
              {isRowExpanded && expandedRowData && expandedRowData.idPedido == pedidoMap.id && (
                <tr>
                  <td class="text-center small-font" colSpan="6">
                    <div>
                      <p>Endereço de entrega: {expandedRowData.endereco}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default PedidosTable;
