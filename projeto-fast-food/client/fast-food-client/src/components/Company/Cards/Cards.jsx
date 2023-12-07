import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

const Cards = ({ company }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src="/undraw_breakfast_psiw.svg" alt={`Logo da ${company.nome}`} />
      </div>
      <div className="card-container">
        <h4 className="text-bold nomeempresa">{company.nome}</h4>
        <p className="h6">
          <i className="fas fa-mobile-alt" style={{ marginRight: '5px' }}></i>
          {company.telefone}
        </p>
        <p>
          <i className="fa-solid fa-store" style={{ marginRight: '5px' }}></i>
          {company.cpf_cnpj}
        </p>
      </div>
    </div>
  );
};

Cards.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    telefone: PropTypes.string,
    cpf_cnpj: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;
