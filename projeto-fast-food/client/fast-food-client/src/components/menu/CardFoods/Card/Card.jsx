import React, { useState } from "react";
import "./Card.css";
import { CardDetail } from "../CardDetail/CardDetail";

export function Card({ produto }) {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="Card" key={produto.id}>
      <div className="CardIntern" onClick={handleClick}>
        <figcaption>
          <h4>{produto.nome}</h4>
          <div className="TextDiv">
            <p>
              {produto.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </figcaption>
      </div>
      {showDetail && <CardDetail product={produto} />}
    </div>
  );
}
