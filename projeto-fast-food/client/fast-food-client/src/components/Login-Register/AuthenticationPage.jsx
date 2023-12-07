import React, { useState } from 'react';
import './AuthenticationPage.css'; 
import AuthService from './../../services/Auth/AuthService';
import CpfCnpjInput from '../mask/CpfCnpj';
import TelefoneMask from './../mask/Telefone';

const AuthenticationPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formDataSignUp, setFormDataSignUp] = useState({
    nome: '',
    cpf_cnpj: '',
    telefone: '',
    email: '',
    senha: '',
  });

  const [formDataLogIn, setFormDataLogIn] = useState({
    email: '',
    senha: '',
  });

  const handleFormSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormDataSignUp((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormLogInChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogIn((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = isSignUpMode ? formDataSignUp : formDataLogIn;
    
    try {
      isSignUpMode ? await AuthService.signup(formData) :  await AuthService.login(formData);
      isSignUpMode
      ? setFormDataSignUp({ nome: '', cpf_cnpj: '', telefone: '', email: '', senha: '' })
      : setFormDataLogIn({ email: '', senha: '' });
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={`containerCadastro ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Entrar</h2>
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" name="email" value={formDataLogIn.email} placeholder="E-mail" onChange={handleFormLogInChange} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="senha" value={formDataLogIn.senha} placeholder="Senha" onChange={handleFormLogInChange} autoComplete="current-password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <div className="social-media">
              <a href="/reset" className="password-reset">
                Esqueci minha senha
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Cadastre-se</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" name="nome" value={formDataSignUp.nome} placeholder="Nome" onChange={handleFormSignUpChange} />
            </div>
            <div className="input-field">
              <i className="fa-solid fa-id-card"></i>
              <CpfCnpjInput formDataSignUp={formDataSignUp} handleFormSignUpChange={handleFormSignUpChange} />
            </div>
            <div className="input-field">
              <i className="fa-solid fa-phone"></i>
              <TelefoneMask formDataSignUp={formDataSignUp} handleFormSignUpChange={handleFormSignUpChange} />
            </div>
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" name="email" value={formDataSignUp.email} placeholder="E-mail" onChange={handleFormSignUpChange} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="senha" value={formDataSignUp.senha} placeholder="Senha" onChange={handleFormSignUpChange} autoComplete="current-password" />
            </div>
            <input type="submit" className="btn" value="Cadastre-se" />
            <p className="social-text">Acesso ao Projeto</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Novo Aqui ?</h3>
            <p>Cadastre-se já e tenha acesso a produtos incríveis!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Cadastre-se
            </button>
          </div>
          <img src="/undraw_breakfast_psiw.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Já é um de nós?</h3>
            <p>Entre com seus dados e aproveite nossas ofertas!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Entrar
            </button>
          </div>
          <img src="/undraw_online_groceries_a02y.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
