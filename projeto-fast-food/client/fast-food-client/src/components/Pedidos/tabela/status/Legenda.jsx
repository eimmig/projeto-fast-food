import React from 'react';
import './Legenda.css';

const Legend = () => {
  const getStatus = (index) => {
    switch (index) {
      case 0:
        return "Lido";
      case 1:
        return "Em Preparação";
      case 2:
        return "Enviado";
      case 3:
        return "Entregue";
      case 4:
        return "Não Lido";;
    }
  };

  const cores = ['#FF5733', '#33FF57', '#5733FF', '#33FFE0', '#FF33E0'];

  return (
    <div className="legend-container">
      {cores.map((cor, index) => (
        <div key={index} className="legend-item">
          <div className="status-dot" style={{ backgroundColor: cor }}>
            <span className="legend-text">{getStatus(index)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
