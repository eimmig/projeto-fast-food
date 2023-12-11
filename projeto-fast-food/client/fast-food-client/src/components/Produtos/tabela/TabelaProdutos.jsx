import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../Produtos.css';
import BodyObserver from '../../observer/BodyObserver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProdutosTable = React.forwardRef(({ keyProp, editarProduto }, ref) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [produto, setProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  const handleBodyClassChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  const carregarProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produto/getByUser/' + JSON.parse(localStorage.getItem('user')).id);
      setProdutos(response.data.produtos);
      setFilteredProdutos(response.data.produtos);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  const excluirProduto = async (id) => {
    try {
      const resposta = await axios.delete(`http://localhost:3000/produto/${id}`);
      toast.success('Produto Excluído com Sucesso!');
      recarregarTabela();
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      toast.error(error.response.data);
    }
  };

  const handleInputChange = (event) => {
    const termoBusca = event.target.value;
    setSearchTerm(termoBusca);

    const produtoFiltrados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    setFilteredProdutos(produtoFiltrados);
  };

  const recarregarTabela = () => {
    carregarProdutos();
  };

  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    carregarProdutos();
  }, [keyProp, ref]);

  React.useImperativeHandle(ref, () => ({
    getProduto: () => produto,
  }));

  const editarProdutoFunc = async (produto) => {
    produto = await atualizarProduto(produto.id);
    setProduto(produto);
    setTimeout(() => {
      editarProduto();
    }, 0);
  };

  const atualizarProduto = async (id) => { 
    try {
      const response = await axios.get(`http://localhost:3000/produto/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  }

  return (
    <div>
      <InputGroup className="mb-1 input-produto">
        <FormControl 
          placeholder="Buscar produto pelo nome..." 
          value={searchTerm}
          onChange={handleInputChange}
        />
      </InputGroup>
      <BodyObserver onBodyClassChange={handleBodyClassChange} />
      <Table striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
        <thead>
          <tr>
            <th className="text-center col-md-2 small-font">Nome</th>
            <th className="text-center col-md-2 small-font">Categoria</th>
            <th className="text-center col-md-3 small-font">Valor</th>
            <th className="text-center col-md-2 small-font">Ativo</th>
            <th className="text-center col-md-3 small-font">Ação</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((produto) => (
            <tr key={produto.id}>
              <td className="text-center small-font">{produto.nome}</td>
              <td className="text-center small-font">{produto.categoria.nome}</td>
              <td className="text-center small-font">R$ {produto.valor}</td>
              <td className="text-center small-font">{produto.ativo ? "Ativo" : "Inativo"}</td>
              <td className="text-center small-font">
                <Button
                  className="small-button btn-produto mr-2"
                  variant="primary"
                  onClick={() => editarProdutoFunc(produto)}
                >
                  Editar
                </Button>
                <Button
                  className="small-button"
                  variant="danger"
                  onClick={() => excluirProduto(produto.id)}
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

export default ProdutosTable;
