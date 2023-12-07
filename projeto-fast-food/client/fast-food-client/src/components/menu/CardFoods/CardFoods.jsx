import React from "react";
import { CircularProgress } from "@mui/material";
import { Card } from "./Card/Card";

const CardFoods = ({ categories, inputSearch, mockRestaurantList }) => {
   const renderList = mockRestaurantList
      .filter((category) => {
         if (categories === "Todos") {
            return true;
         } else {
            return category.category === categories;
         }
      })
      .filter((nome) => {
         return nome.name.toLowerCase().includes(inputSearch.toLowerCase());
      })
      .map((restaurant) => <Card key={restaurant.id} restaurant={restaurant} />);

   return (
      <div className="CardFoodsContainer">
         {renderList.length > 0 ? (
            renderList
         ) : (
            <CircularProgress className="CircularProgress" size={64} color={"inherit"} />
         )}
      </div>
   );
};

export default CardFoods;
