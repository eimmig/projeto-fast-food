import React, { useState } from 'react';
import './AuthenticationPage.css'; 
import AuthService from './../../services/Auth/AuthService';

const PasswordResetPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formDataResetPassword, setFormDataResetPassword] = useState({
    email: ''
  });


  const handleFormResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormDataResetPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       AuthService.resetPassword(formDataResetPassword)
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Recuperar a senha</h2>
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" name="email" value={formDataResetPassword.email} placeholder="E-mail" onChange={handleFormResetPasswordChange} />
            </div>
            <input type="submit" value="Recuperar" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Lembrou da senha ?</h3>
            <p>Entre agora mesmo!</p>
            <a href='/login'>
              <button className="btn transparent" href="/">
                Entrar
              </button>
            </a>
          </div>
          <img src="/undraw_mailbox_re_dvds.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
