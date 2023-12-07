import React from "react";
import "./Card.css";

export function Card({ restaurant }) { 
    return (
    <div className="Card" key={restaurant.id}>
       <img src={restaurant.logoUrl} height={130} alt={restaurant.name} />
       <figcaption>
          <h4>{restaurant.name}</h4>
          <div>
             <p>
                {restaurant.deliveryTime} -{" "}
                {Math.round(restaurant.deliveryTime * 0.25) + restaurant.deliveryTime} min
             </p>
             <p>
                Frete{" "}
                {restaurant.shipping.toLocaleString("pt-br", {
                   style: "currency",
                   currency: "BRL",
                })}
             </p>
          </div>
       </figcaption>
    </div>
 );
}