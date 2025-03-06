import Alert from '@mui/material/Alert';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

const CadastroSimplificado = ({ onNext }) => {
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosPessoais({
      ...dadosPessoais,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const specialCharRegex = /[áéíóúãõ~ç!#$%^&*(),?":{}|<>]/g; // Expressão regular para detectar caracteres especiais
    return !specialCharRegex.test(email); // Retorna true se não houver caracteres especiais
  };

  const validate = () => {
    let errors = {};
    if (!dadosPessoais.nome) errors.nome = "Nome completo é obrigatório";
    if (!dadosPessoais.email) {
      errors.email = "E-mail é obrigatório";
    } else if (!validateEmail(dadosPessoais.email)) {
      errors.email = "E-mail contém caracteres especiais inválidos";
    }
    if (!dadosPessoais.telefone) errors.telefone = "Telefone é obrigatório";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(dadosPessoais);
      navigate('/simulador');
    }
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <img src="/sources/img/icone.png" alt="Icone Informações Pessoais" className="img-fluid img-icon" />
          <h2 className='title-desc'>Faça sua simulação de <b>forma gratuita</b></h2>
          <p className='paragrah-desc'>Preencha as informações a seguir, para criarmos a <b>melhor oferta de crédito</b>.</p>
          <p className='paragrah-desc'>Não se preocupe, você ainda não estará contratando o empréstimo.</p>
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            <h3>Informações Pessoais</h3>
            <div className="mb-3">
              <label className="form-label">Nome Completo</label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                  name="nome"
                  value={dadosPessoais.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              {errors.nome && <Alert severity="error">{errors.nome}</Alert>}
            </div>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={dadosPessoais.email}
                  onChange={handleChange}
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>
              {errors.email && <Alert severity="error">{errors.email}</Alert>}
            </div>
            <div className="mb-3">
              <label className="form-label">Telefone</label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-telephone"></i>
                </span>
                <InputMask
                  mask="+55 (99) 99999-9999"
                  className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                  name="telefone"
                  value={dadosPessoais.telefone}
                  onChange={handleChange}
                  placeholder="+55 (11) 91234-5678"
                  required
                />
              </div>
              {errors.telefone && <Alert severity="error">{errors.telefone}</Alert>}
            </div>
            <button className="btn btn-continuar" onClick={handleNext}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroSimplificado;
