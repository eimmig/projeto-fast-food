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
   const userId = JSON.parse(localStorage.getItem('user')).id;
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      axios.get(`http://localhost:3000/user/get/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

      axios.get(`http://localhost:3000/pedido/findByUser/${userId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching user orders:', error);
      });
      
    }, [userId]);


   function formatarDataParaPTBR(dataISO8601) {
      const data = new Date(dataISO8601);
    
      const dia = data.getDate();
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();
      const hora = data.getHours();
      const minutos = data.getMinutes();
      const segundos = data.getSeconds();
    
      const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    
      return dataFormatada;
    }

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
                     <button className="EditIcon" onClick={() => navigate("/profile/edit/user")}>
                        <img src={edit} width="24" alt="Edit icon" />
                     </button>
                  </div>

                  <div className="UserInfo Address">
                     <div>
                        <p>Endereço Cadastrado</p>
                        <p>{user.endereco.rua} - {user.endereco.numero} - {user.endereco.bairro} - {user.endereco.cidade} - {user.endereco.estado}</p>
                     </div>
                     <button className="EditIcon" onClick={() => navigate("/profile/address")}>
                        <img src={edit} width="24" alt="Edit icon" />
                     </button>
                  </div>

                  <div className="OrderHistory">
                     <h3 className="TitleCard">Histórico de pedidos</h3>

                     {orders.map((order, index) => (
                        <div className="OrderItem" key={index}>
                           <p>Cod: {order.id}</p>
                           <p>Data: {formatarDataParaPTBR(order.data_pedido)}</p>
                           <p>SUBTOTAL: {order.valor_total}</p>
                        </div>
                     ))}
                  </div>
               </>
            ) : (
                <CircularProgress className="CircularProgress" size={64} color={"inherit"} />
            )}
         </div>

        <div className="Menu">
         <button
           onClick={() => {
            navigate("/" + localStorage.getItem('companyId'));
           }}
        >
           <img src={house1} width="27" height="27" alt="Home Icon" />
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
           <img src={avatar2} width="27" height="27" alt="Profile Icon" />
         </button>
       </div>
      </div>
   );
}
