import React, { useState } from 'react';
import './SideBar.css'; 
import PainelPage from '../Painel/PainelPage';
import AuthService from '../../services/Auth/AuthService';
import GridProdutos from '../produtos/Produtos';
import GridPedidos from '../Pedidos/Pedido';

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const [activeNavItem, setActiveNavItem] = useState(null);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const renderGrid = () => {
    switch (activeNavItem) {
      case 'inicio':
        return <PainelPage />;
      case 'pedidos':
        return < GridPedidos/>;
      case 'cadastro':
        return <GridProdutos />;
      default:
        return <PainelPage />;
    }
  }

  return (
    <>
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <span className="image-span">
              <img src="fastfood-high-resolution-logo-transparent.png" alt="Logo" />
            </span>
            <div className="text header-text">
              <span className="name">FastFood</span>
            </div>
          </div>
          <i className="fa-solid fa-angle-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link p-0" onClick={() => handleNavItemClick('inicio')}>
                <a href="#">
                  <i className="fa-solid fa-house icon"></i>
                  <span className="text nav-text">Início</span>
                </a>
              </li>
              <li className="nav-link p-0"  onClick={() => handleNavItemClick('pedidos')}>
                <a href="#">
                <i className="fa-regular fa-note-sticky icon"></i>
                  <span className="text nav-text">Pedidos</span>
                </a>
              </li>
              <li className="nav-link p-0"  onClick={() => handleNavItemClick('cadastro')}>
                <a href="#">
                <i className="fa-solid fa-utensils icon"></i>
                  <span className="text nav-text">Produtos</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="botton-content">
            <li className="logout-box p-0" onClick={() => AuthService.logout()}>
                <a href="#" target="_blank">
                    <i className="icon fa-solid fa-door-open"></i>
                  <span className="text nav-text">Sair</span>
                </a>
            </li>
            <li className="mode" onClick={toggleDarkMode}>
              <div className="moon-sun">
                <i className={`fa-solid fa-moon icon ${isDarkMode ? 'moon' : ''}`}></i>
                <i className={`fa-solid fa-sun icon ${isDarkMode ? '' : 'sun'}`}></i>
              </div>
              <span className="mode-text text">{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
      <section className="home">
        {renderGrid()}
      </section>
    </>
  );
};

export default Sidebar;