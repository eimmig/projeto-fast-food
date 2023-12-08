import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './ProfilePage.css';
import '../../menu/menuPage.css'
import edit from "../../../assets/img/edit/edit.svg";
import house1 from "../../../assets/img/icon/house1.svg";
import cart1 from "../../../assets/img/icon/cart1.svg";
import avatar2 from "../../../assets/img/icon/avatar2.svg";
import { CircularProgress } from "@mui/material";

export function ProfilePage() {
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   const userId = localStorage.getItem('userId');
   useEffect(() => {
      axios.get(`http://localhost:3000/user/get/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, [userId]);

   return (
      <div className="Container">
         <div className="NavbarContainer">
            <h3 className="Title">FastFood</h3>
         </div>
         <div className="Contents">
            {user ? (
               <>
                  <div className="UserInfo Address">
                     <div>
                        <p>Informações do usuário</p>
                        <p>Nome: {user.nome}</p>
                        <p>Email: {user.email}</p>
                        <p>CPF: {user.cpf_cnpj}</p>
                        <p>Telefone: {user.telefone}</p>
                    </div>
                     <button className="EditIcon" onClick={() => ""}>
                        <img src={edit} width="24" alt="Edit icon" />
                     </button>
                  </div>

                  <div className="UserInfo Address">
                     <div>
                        <p>Endereço Cadastrado</p>
                        <p>{user.endereco.rua} - {user.endereco.numero} - {user.endereco.bairro} - {user.endereco.cidade} - {user.endereco.estado}</p>
                     </div>
                     <button className="EditIcon" onClick={() => ""}>
                        <img src={edit} width="24" alt="Edit icon" />
                     </button>
                  </div>

                  <div className="OrderHistory">
                     <h3 className="TitleCard">Histórico de pedidos</h3>

                     <div className="OrderItem">
                        <p>Bullguer Vila Madalena</p>
                        <p>23 outubro 2019</p>
                        <p>SUBTOTAL R$67,00</p>
                     </div>

                     <div className="OrderItem">
                        <p>Vinil Burger Butantã</p>
                        <p>30 Setembro 2019</p>
                        <p>SUBTOTAL R$89,00</p>
                     </div>

                     <div className="OrderItem">
                        <p>Bullguer Vila Madalena</p>
                        <p>10 Setembro 2019</p>
                        <p>SUBTOTAL R$77,00</p>
                     </div>
                  </div>
               </>
            ) : (
                <CircularProgress className="CircularProgress" size={64} color={"inherit"} />
            )}
         </div>

        <div className="Menu">
         <button
           onClick={() => {
            navigate("/"+localStorage.getItem('company'));
           }}
        >
           <img src={house1} width="27" height="27" alt="Home Icon" />
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
             navigate("/profile");
           }}
         >
           <img src={avatar2} width="27" height="27" alt="Profile Icon" />
         </button>
       </div>
      </div>
   );
}
