import Alert from '@mui/material/Alert';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

const Cadastro = ({ onNext, onBack, currentStep }) => {
  const [etapa, setEtapa] = useState(1);
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: ''
  });
  const [dadosAdicionais, setDadosAdicionais] = useState({
    cpf: '',
    estadoCivil: '',
    renda: '',
    situacaoProfissional: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 0) {
      setEtapa(1);
    } else if (currentStep === 1) {
      setEtapa(2);
    }
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (etapa === 1) {
      setDadosPessoais({
        ...dadosPessoais,
        [name]: value
      });
    } else {
      if (name === "renda") {
        setDadosAdicionais({
          ...dadosAdicionais,
          [name]: formatarRenda(value)
        });
      } else {
        setDadosAdicionais({
          ...dadosAdicionais,
          [name]: value
        });
      }
    }
  };

  const formatarRenda = (valor) => {
    let num = valor.replace(/\D/g, '');
    num = (num / 100).toFixed(2) + '';
    num = num.replace('.', ',');
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return 'R$ ' + num;
  };

  const validateEmail = (email) => {
    const specialCharRegex = /[áéíóúãõ~ç!#$%^&*(),?":{}|<>]/g; // Expressão regular para detectar caracteres especiais
    return !specialCharRegex.test(email); // Retorna true se não houver caracteres especiais
  };

  const validate = () => {
    let errors = {};
    if (etapa === 1) {
      if (!dadosPessoais.nome) errors.nome = "Nome completo é obrigatório";
      if (!dadosPessoais.email) {
        errors.email = "E-mail é obrigatório";
      } else if (!validateEmail(dadosPessoais.email)) {
        errors.email = "E-mail contém caracteres especiais inválidos";
      }
      if (!dadosPessoais.telefone) errors.telefone = "Telefone é obrigatório";
      if (!dadosPessoais.dataNascimento) errors.dataNascimento = "Data de nascimento é obrigatória";
    } else if (etapa === 2) {
      if (!dadosAdicionais.cpf) errors.cpf = "CPF é obrigatório";
      if (!dadosAdicionais.estadoCivil) errors.estadoCivil = "Estado civil é obrigatório";
      if (!dadosAdicionais.renda) errors.renda = "Renda mensal é obrigatória";
      if (!dadosAdicionais.situacaoProfissional) errors.situacaoProfissional = "Situação profissional é obrigatória";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (etapa === 1) {
        setEtapa(2);
      } else {
        onNext({ ...dadosPessoais, ...dadosAdicionais });
        navigate('/simulador');
      }
    }
  };

  const handleBack = () => {
    if (etapa === 2) {
      setEtapa(1);
      onBack();
    } else {
      onBack();
    }
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          {etapa === 1 && (
            <>
              <img src="/sources/img/icone.png" alt="Icone Informações Pessoais" className="img-fluid img-icon" />
              <h2 className='title-desc'>Faça sua simulação de <b>forma gratuita</b></h2>
              <p className='paragrah-desc'>Preencha as informações a seguir, para criarmos a <b>melhor oferta de crédito</b>.</p>
              <p className='paragrah-desc'>Não se preocupe, você ainda não estará contratando o empréstimo.</p>
            </>
          )}
          {etapa === 2 && (
            <>
              <img src="/sources/img/icone.png" alt="Icone Informações Adicionais" className="img-fluid img-icon" />
              <h2>Preencha suas Informações Adicionais</h2>
              <p>Precisamos de mais alguns dados para continuar com a simulação do financiamento.</p>
            </>
          )}
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            {etapa === 1 && (
              <>
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
                <div className="mb-3">
                  <label className="form-label">Data de Nascimento</label>
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-calendar"></i>
                    </span>
                    <input
                      type="date"
                      className={`form-control ${errors.dataNascimento ? 'is-invalid' : ''}`}
                      name="dataNascimento"
                      value={dadosPessoais.dataNascimento}
                      onChange={handleChange}
                      placeholder="Digite sua data de nascimento"
                      required
                    />
                  </div>
                  {errors.dataNascimento && <Alert severity="error">{errors.dataNascimento}</Alert>}
                </div>
                <button className="btn btn-continuar" onClick={handleNext}>
                  Próximo
                </button>
              </>
            )}
            {etapa === 2 && (
              <>
                <h3>Informações Adicionais</h3>
                <div className="mb-3">
                  <label className="form-label">CPF</label>
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-credit-card"></i>
                    </span>
                    <InputMask
                      mask="999.999.999-99"
                      className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                      name="cpf"
                      value={dadosAdicionais.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  {errors.cpf && <Alert severity="error">{errors.cpf}</Alert>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado Civil</label>
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-heart"></i>
                    </span>
                    <select
                      className={`form-select form-control ${errors.estadoCivil ? 'is-invalid' : ''}`}
                      name="estadoCivil"
                      value={dadosAdicionais.estadoCivil}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="solteiro">Solteiro(a)</option>
                      <option value="casado">Casado(a)</option>
                      <option value="divorciado">Divorciado(a)</option>
                      <option value="viuvo">Viúvo(a)</option>
                    </select>
                  </div>
                  {errors.estadoCivil && <Alert severity="error">{errors.estadoCivil}</Alert>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Renda mensal familiar</label>
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-currency-dollar"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.renda ? 'is-invalid' : ''}`}
                      name="renda"
                      value={dadosAdicionais.renda}
                      onChange={handleChange}
                      placeholder="R$ 0,00"
                      required
                    />
                  </div>
                  {errors.renda && <Alert severity="error">{errors.renda}</Alert>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Situação profissional</label>
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-briefcase"></i>
                    </span>
                    <select
                      className={`form-control ${errors.situacaoProfissional ? 'is-invalid' : ''}`}
                      name="situacaoProfissional"
                      value={dadosAdicionais.situacaoProfissional}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="empregado">Empregado</option>
                      <option value="desempregado">Desempregado</option>
                      <option value="autonomo">Autônomo</option>
                      <option value="empresario">Empresário/Empreendedor</option>
                    </select>
                  </div>
                  {errors.situacaoProfissional && <Alert severity="error">{errors.situacaoProfissional}</Alert>}
                </div>
                <div className="text-center">
                  <button className="btn btn-link" onClick={handleBack}>
                    Voltar
                  </button>
                </div>
                <button className="btn btn-continuar" onClick={handleNext}>
                  Próximo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
