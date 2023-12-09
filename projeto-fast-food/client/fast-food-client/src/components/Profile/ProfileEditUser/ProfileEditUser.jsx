import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { UseForm } from "../../../services/useForm";
import { useNavigate } from "react-router-dom";
import "./ProfileEditUser.css";
import axios from 'axios';
import { toast } from 'react-toastify';

export function ProfileEditUser() {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [form, handleInputChange, clear] = UseForm({
      name: "",
      email: "",
      cpf: "",
   });
   const onSubmitForm = (e) => {
      setIsLoading(true);
      e.preventDefault();
      axios.put("http://localhost:3000/user/" + JSON.parse(localStorage.getItem("user")).id, form)
      .then(response => {
         console.log('Atualização bem-sucedida:', response.data);
         toast.success('Usuário atualizado com sucesso!');
         setIsLoading(false);
         navigate("/profile");
      })
      .catch(error => {
         console.error('Erro na atualização:', error.response ? error.response.data : error.message);
         toast.error('Erro na atualização!');
      });
   };

   return (
      <div className="Container">
        <div className="NavbarContainer">
         <h3 className="Title">Editar Usuário</h3>
         <button
            className="Button"
            onClick={() => { navigate("/profile") }}
          >
            Voltar
          </button>
       </div>
         <div className="RegistrationContainer">
            <form className="formEditUser" onSubmit={onSubmitForm}>
               <div>
                  <label className="label">Nome*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="name"
                     id="name"
                     placeholder="Nome"
                     onChange={handleInputChange}
                     required
                  />
               </div>
               <div>
                  <label className="label">E-mail*</label>
                  <input className="inputEditUser"
                     type="email"
                     name="email"
                     id="email"
                     placeholder="e-mail"
                     onChange={handleInputChange}
                     required
                  />
               </div>
               <div>
                  <label className="label">Telefone*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="telefone"
                     id="telefone"
                     placeholder="(99)99999-9999"
                     onChange={handleInputChange}
                     required
                  />
               </div>

               <button className="buttonEditUser" type="submit">
                  {isLoading ? (
                     <CircularProgress size={16} color={"inherit"} />
                  ) : (
                     <>Salvar</>
                  )}
               </button>
            </form>
         </div>
      </div>
   );
}
