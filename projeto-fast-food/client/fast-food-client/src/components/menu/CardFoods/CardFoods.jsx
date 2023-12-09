import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Card } from "./Card/Card";
import axios from "axios";
import "./CardFoods.css";

const CardFoods = ({ categories, inputSearch }) => {
  const companyId = localStorage.getItem('companyId');
  const [ProdutosList, setProdutosList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produto/getByUser/' + companyId);
        if (!response.data) {
          throw new Error('Erro ao obter produtos');
        }
        setProdutosList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }
    };

    FetchProducts();
  }, [companyId]); 

  const productList = ProdutosList.produtos || [];

  const renderedProducts = productList
  .filter((produto) => {
    if (categories === "Todos") {
      return true;
    } else {
      return produto.categoria.id === categories;
    }
  })
  .filter((produto) => {
    return produto.nome.toLowerCase().includes(inputSearch.toLowerCase());
  })
  .map((produto) => <Card key={produto.id} produto={produto} />);

  return (
    <div className="CardFoodsContainer">
      {loading ? (
        <CircularProgress className="CircularProgress" size={64} color={"inherit"} />
      ) : (
        renderedProducts.length > 0 ? (
          renderedProducts
        ) : (
          <p>Nenhum produto encontrado.</p>
        )
      )}
    </div>
  );
};

export default CardFoods;
