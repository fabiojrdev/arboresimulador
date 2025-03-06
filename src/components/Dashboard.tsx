import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { prestacaoPrice, prazoMeses } = state || {};

  const handleRefazerSimulacao = () => {
    navigate('/simulador');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Resultado da Simulação</h3>
          {state ? (
            <>
              <div className="resultado-item">
                <p>Prestação Mensal:</p>
                <p className="valor">R$ {prestacaoPrice}</p>
              </div>
              <div className="resultado-item">
                <p>Prazo Total (Anos):</p>
                <p className="valor">{Math.floor(prazoMeses / 12)}</p>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=551137426888&text=Ol%C3%A1,%20gostaria%20de%20falar%20sobre%20a%20minha%20simula%C3%A7%C3%A3o%20de%20financiamento."
                className="btn btn-continuar btn-success mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Agora com um Consultor
              </a>
              <button
                className="btn-link btn-secondary mt-3"
                onClick={handleRefazerSimulacao}
              >
                Refazer Simulação
              </button>
            </>
          ) : (
            <p>Nenhum resultado disponível. Por favor, realize uma simulação primeiro.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
