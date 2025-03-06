import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <img className="logo-arbore img-fluid" src="https://arboreengenharia.com.br/wp-content/uploads/2022/11/logo-arbore-animado.gif" alt="Logo" />
      <nav>
        <a className="btn-voltar" href="#help">Ajuda</a>
      </nav>
    </header>
  );
}

export default Header;
