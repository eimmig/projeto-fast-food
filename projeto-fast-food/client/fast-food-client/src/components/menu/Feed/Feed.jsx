// Feed.jsx

import React, { useState } from "react";
import "./Feed.css";
import "../menuPage.css";
import CardFoods from "../CardFoods/CardFoods";
import house2 from "../../../assets/img/icon/house2.svg";
import cart1 from "../../../assets/img/icon/cart1.svg";
import avatar1 from "../../../assets/img/icon/avatar1.svg";
import search from "../../../assets/img/search/search.svg";


export function Feed() {
   const [categories, setCategories] = useState("Todos");
   const [inputSearch, setInputSearch] = useState("");

   const onChangeCategories = (value) => {
      setCategories(value);
   };

   const onChangeInputSearch = (e) => {
      setInputSearch(e.target.value);
   };

   const onLogout = () => {
      console.log('Logging out...');
      AuthService.logout();
      window.location.reload();
    };

   const mockCategories = [
      "Todos",
      "Hamburguer",
      "Asiática",
      "Mexicana",
      "Italiana",
      "Sorvetes",
      "Carnes",
      "Baiana",
      "Petiscos",
   ];

   const mockRestaurantList = [
      {
         id: 1,
         name: "Restaurante 1",
         category: "Hamburguer",
         deliveryTime: 30,
         shipping: 5.0,
         logoUrl: "/undraw_breakfast_psiw.svg",
      },
      {
         id: 2,
         name: "Restaurante 2",
         category: "Asiática",
         deliveryTime: 45,
         shipping: 8.0,
         logoUrl: "/undraw_breakfast_psiw.svg",
      },
   ];

   return (
      <div className="Container">
         <div className="NavbarContainer">
            <h3 className="Title">FastFood</h3>
            <button
               className="Button"
               onClick={onLogout}
            >
               Voltar
            </button>
         </div>

         <div className="Contents">
            <div className="ContentsHeader">
               <button
                  className="SearchButton"
                  onClick={() => {
                     // Seu código para pesquisar aqui
                  }}
               >
                  <div className="SectionButtonSearch">
                     <img src={search} alt="Search Icon" />
                     <p>Pesquisar...</p>
                  </div>
               </button>

               <ul className="Categories">
                  {mockCategories.map((category) => (
                     <li key={category}>
                        <button
                           value={category}
                           categories={categories}
                           onClick={() => onChangeCategories(category)}
                           style={{
                              color: categories === category ? "#e21" : "inherit",
                           }}
                        >
                           {category}
                        </button>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="Cards">
               <CardFoods categories={categories} inputSearch={inputSearch} mockRestaurantList={mockRestaurantList} />
            </div>
         </div>

         <div className="Menu">
            <button
               onClick={() => {
                  // Seu código para ir para a página inicial aqui
               }}
            >
               <img src={house2} width="27" height="27" alt="Home Icon" />
            </button>

            <button
               onClick={() => {
                  // Seu código para ir para a página do carrinho aqui
               }}
            >
               <img src={cart1} width="27" height="27" alt="Cart Icon" />
            </button>

            <button
               onClick={() => {
                  // Seu código para ir para a página do perfil aqui
               }}
            >
               <img src={avatar1} width="27" height="27" alt="Profile Icon" />
            </button>
         </div>
      </div>
   );
}
