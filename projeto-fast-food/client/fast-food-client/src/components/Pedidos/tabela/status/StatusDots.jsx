import React from 'react';
import './StatusDots.css';

const StatusDots = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'LIDO':
        return ['status-1', "Lido"];
      case 'EM_PREPARACAO':
        return ['status-2', "Em Preparação"];
      case 'ENVIADO':
        return ['status-3', "Enviado"];
      case 'ENTREGUE':
        return ['status-4', "Entregue"];
      case 'NAO_LIDO':
        return ['status-5', "Não Lido"];
    }
  };

  const [dotClass, legenda] = getStatusColor(status);


  return <div className={`status-dot ${dotClass}`} title={legenda}></div>;
};

export default StatusDots;
