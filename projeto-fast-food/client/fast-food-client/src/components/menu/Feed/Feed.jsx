// Feed.jsx

import React, { useEffect, useState } from "react";
import "./Feed.css";
import "../menuPage.css";
import CardFoods from "../CardFoods/CardFoods";
import house2 from "../../../assets/img/icon/house2.svg";
import cart1 from "../../../assets/img/icon/cart1.svg";
import avatar1 from "../../../assets/img/icon/avatar1.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export function Feed() {
   const [categories, setCategories] = useState("Todos");
   const [inputSearch, setInputSearch] = useState("");
   const [allCategories, setAllCategories] = useState([]);
   const navigate = useNavigate();
 
   const onChangeCategories = (value) => {
     setCategories(value);
   };
 
   const onChangeInputSearch = (e) => {
     setInputSearch(e.target.value);
   };
 
   const changeEmpresa = () => {
      navigate('/');
   };
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const categoriesResponse = await axios.get('http://localhost:3000/category/getAll');
         if (!categoriesResponse.data) {
           throw new Error('Erro ao obter categorias');
         }
         setAllCategories(categoriesResponse.data);
       } catch (error) {
         console.error('Erro ao obter dados:', error);
       }
     };
 
     fetchData(); 
   }, []); 
 
   return (
     <div className="Container">
       <div className="NavbarContainer">
         <h3 className="Title">FastFood</h3>
         <button
            className="Button"
            onClick={changeEmpresa}
          >
            Voltar
          </button>
       </div>
 
       <div className="Contents">
         <div className="ContentsHeader">
         <input
              type="text"
              className="SearchButton"
              placeholder="Pesquisar..."
              onChange={(e) => onChangeInputSearch(e)}
            />
           <ul className="Categories">
                <li key={""}>
                 <button
                   value={"Todos"}
                   categories={categories}
                   onClick={() => onChangeCategories("Todos")}
                   style={{
                     color: categories === "Todos" ? "#e21" : "inherit",
                   }}
                 >
                   Todos
                 </button>
               </li>
             {allCategories.map((category) => (
               <li key={category.id}>
                 <button
                   value={category.id}
                   categories={categories}
                   onClick={() => onChangeCategories(category.id)}
                   style={{
                     color: categories === category.id ? "#e21" : "inherit",
                   }}
                 >
                   {category.nome}
                 </button>
               </li>
             ))}
           </ul>
         </div>
 
         <div className="Cards">
           <CardFoods categories={categories} inputSearch={inputSearch}/>
         </div>
       </div>
 
       <div className="Menu">
         <button
           onClick={() => {
            navigate("/"+ localStorage.getItem("companyId"));
           }}
         >
           <img src={house2} width="27" height="27" alt="Home Icon" />
         </button>
 
         <button
           onClick={() => {
            navigate('/cart');
           }}
         >
           <img src={cart1} width="27" height="27" alt="Cart Icon" />
         </button>
 
         <button
           onClick={() => {
             navigate("/profile");
           }}
         >
           <img src={avatar1} width="27" height="27" alt="Profile Icon" />
         </button>
       </div>
     </div>
   );
 }