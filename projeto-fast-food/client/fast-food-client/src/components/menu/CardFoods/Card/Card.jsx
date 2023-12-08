import React from "react";
import "./Card.css";

export function Card({ produto }) { 
    return (
    <div className="Card" key={produto.id}>
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
 );
}