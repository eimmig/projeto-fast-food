import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseForm } from "../../../services/useForm";
import { CircularProgress } from "@mui/material";
import "../ProfileEditUser/ProfileEditUser.css";
import "./ProfileEditAddress.css";
import axios from "axios";
import { toast } from "react-toastify";

export function ProfileEditAddress() {

   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [form, handleInputChange, clear] = UseForm({
      street: "",
      number: "",
      neighbourhood: "",
      city: "",
      state: "",
      complement: "",
      cep: "",
   });

   const estados = [
      { nome: 'Acre', sigla: 'AC' },
      { nome: 'Alagoas', sigla: 'AL' },
      { nome: 'Amapá', sigla: 'AP' },
      { nome: 'Amazonas', sigla: 'AM' },
      { nome: 'Bahia', sigla: 'BA' },
      { nome: 'Ceará', sigla: 'CE' },
      { nome: 'Distrito Federal', sigla: 'DF' },
      { nome: 'Espírito Santo', sigla: 'ES' },
      { nome: 'Goiás', sigla: 'GO' },
      { nome: 'Maranhão', sigla: 'MA' },
      { nome: 'Mato Grosso', sigla: 'MT' },
      { nome: 'Mato Grosso do Sul', sigla: 'MS' },
      { nome: 'Minas Gerais', sigla: 'MG' },
      { nome: 'Pará', sigla: 'PA' },
      { nome: 'Paraíba', sigla: 'PB' },
      { nome: 'Paraná', sigla: 'PR' },
      { nome: 'Pernambuco', sigla: 'PE' },
      { nome: 'Piauí', sigla: 'PI' },
      { nome: 'Rio de Janeiro', sigla: 'RJ' },
      { nome: 'Rio Grande do Norte', sigla: 'RN' },
      { nome: 'Rio Grande do Sul', sigla: 'RS' },
      { nome: 'Rondônia', sigla: 'RO' },
      { nome: 'Roraima', sigla: 'RR' },
      { nome: 'Santa Catarina', sigla: 'SC' },
      { nome: 'São Paulo', sigla: 'SP' },
      { nome: 'Sergipe', sigla: 'SE' },
      { nome: 'Tocantins', sigla: 'TO' }
    ];

    const enderecoId = JSON.parse(localStorage.getItem("user")).endereco.id;
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const url = enderecoId ? `http://localhost:3000/endereco/${enderecoId}` : 'http://localhost:3000/endereco/save';
    const onSubmitForm = (e) => {
      setIsLoading(true);
      e.preventDefault();
      axios({
         method: enderecoId ? 'put' : 'post',
         url: url,
         data: {
           ...form,
           userId: userId
         }
       })
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
         <h3 className="Title">Editar Endereço</h3>
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
                  <label className="label">Rua*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="street"
                     value={form.street}
                     onChange={handleInputChange}
                     id="street"
                     placeholder="Rua / Av."
                     required
                  />
               </div>

               <div>
                  <label className="label">Número*</label>
                  <input className="inputEditUser"
                     type="number"
                     name="number"
                     value={form.number}
                     onChange={handleInputChange}
                     id="number"
                     placeholder="Número"
                     required
                  />
               </div>

               <div>
                  <label className="label">Complemento</label>
                  <input className="inputEditUser"
                     type="text"
                     name="complement"
                     value={form.complement}
                     onChange={handleInputChange}
                     id="complement"
                     placeholder="Apto. / Bloco"
                  />
               </div>

               <div>
                  <label className="label">Bairro*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="neighbourhood"
                     value={form.neighbourhood}
                     onChange={handleInputChange}
                     id="neighbourhood"
                     placeholder="Bairro"
                     required
                  />
               </div>

               <div>
                  <label className="label">Cidade*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="city"
                     value={form.city}
                     onChange={handleInputChange}
                     id="city"
                     placeholder="Cidade"
                     required
                  />
               </div>

               <div>
                  <label className="label">Estado*</label>
                  <select
                     className="inputEditUser"
                     name="state"
                     value={form.state}
                     onChange={handleInputChange}
                     id="state"
                     required
                  >
                     <option value="" disabled>Selecione um estado</option>
                     {estados.map((estado) => (
                        <option key={estado.sigla} value={estado.sigla}>
                           {estado.nome}
                        </option>
                     ))}
                  </select>
               </div>

               <div>
                  <label className="label">CEP*</label>
                  <input className="inputEditUser"
                     type="text"
                     name="cep"
                     value={form.cep}
                     onChange={handleInputChange}
                     id="cep"
                     placeholder="CEP"
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
