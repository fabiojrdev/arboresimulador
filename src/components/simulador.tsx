import Alert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Simulador.css';

const Simulador = ({ onNext, onBack, currentStep, dadosCadastro }) => {
  const [prazo, setPrazo] = useState(3); // Prazo em anos
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const [fgts, setFgts] = useState(null);
  const [valorFgts, setValorFgts] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 2) {
      navigate('/simulador');
    }
  }, [currentStep, navigate]);

  const handlePrazoChange = (event) => {
    setPrazo(event.target.value);
  };

  const handleValorImovelChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorImovel(valorFormatado);
    const entradaCalculada = ((valor * 0.2) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setEntrada(entradaCalculada);
  };

  const handleFgtsChange = (valor) => {
    setFgts(valor);
    if (valor === false) {
      setValorFgts('');
    }
  };

  const handleValorFgtsChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorFgts(valorFormatado);
  };

  const validate = () => {
    let errors = {};
    if (!valorImovel) errors.valorImovel = "Valor do imóvel é obrigatório";
    if (!entrada) errors.entrada = "O imóvel não pode ser 100% financiado, com entrada mínima de 20% do valor financiado";
    if (fgts && !valorFgts) errors.valorFgts = "Valor do FGTS é obrigatório";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const valorImovelNum = parseFloat(valorImovel.replace(/\D/g, '')) / 100;
    const entradaNum = parseFloat(entrada.replace(/\D/g, '')) / 100;
    const valorFgtsNum = fgts ? parseFloat(valorFgts.replace(/\D/g, '')) / 100 : 0;

    const taxaJurosAnual = 7.00 / 100;
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovelNum - entradaNum - valorFgtsNum;

    const prazoMeses = prazo * 12;

    const amortizacaoMensal = valorFinanciado / prazoMeses;
    let ultimaPrestacao = 0;

    for (let i = 0; i < prazoMeses; i++) {
      const jurosMensal = (valorFinanciado - i * amortizacaoMensal) * taxaJurosMensal;
      const prestacaoMensal = amortizacaoMensal + jurosMensal;
      ultimaPrestacao = prestacaoMensal;
    }

    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));

    const dataSimulacao = {
      prestacaoPrice: prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      prazoMeses: prazoMeses,
      valorFinanciado: valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ultimaPrestacao: ultimaPrestacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      valorFgts: valorFgts,
      entrada: entradaNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };

    onNext(dataSimulacao);
    navigate('/dashboard', { state: { prestacaoPrice: dataSimulacao.prestacaoPrice, prazoMeses: dataSimulacao.prazoMeses, valorFinanciado: dataSimulacao.valorFinanciado, ultimaPrestacao: dataSimulacao.ultimaPrestacao, entrada: dataSimulacao.entrada } });
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <h2 className='casa-propria'>Realize o sonho da casa própria!</h2>
          <p className='simular-text'>Preencha os dados referente ao <span>imovel que você deseja simular!*</span></p>
          <img className="logo-caixa-minha img-fluid" src="/sources/img/logo-caixa.png" alt="Logo Caixa" />
          <p className='texto-auxiliar'>*Simulação realizada com base nas condições vigentes da Caixa Econômica Federal, sujeita a alteração.</p>
          <p className='texto-auxiliar'>*Sujeito à aprovação de crédito conforme políticas da Árbore Engenharia e agentes financeiros.</p>
          <p className='texto-auxiliar'>*Os resultados são apenas uma simulação e não uma proposta de financiamento.</p>
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            <form onSubmit={calcular} className="needs-validation" noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="valor-imovel">Valor do Imóvel (R$):</label>
                <input
                  className={`form-control ${errors.valorImovel ? 'is-invalid' : ''}`}
                  type="text"
                  id="valor-imovel"
                  name="valorImovel"
                  value={valorImovel}
                  onChange={handleValorImovelChange}
                  placeholder="Digite o valor do imóvel"
                  required
                />
                {errors.valorImovel && (
                  <Alert severity="error" className="mt-2">
                    {errors.valorImovel}
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="entrada">Entrada (R$): <span className='entrada-label'>*Entrada 100% parcelada</span></label>
                <input
                  className={`form-control ${errors.entrada ? 'is-invalid' : ''}`}
                  type="text"
                  id="entrada"
                  name="entrada"
                  value={entrada}
                  placeholder="Digite o valor da entrada"
                  readOnly
                />
                {errors.entrada && (
                  <Alert severity="error" className="mt-2">
                    {errors.entrada}
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="prazo">Prazo (anos):</label>
                <input
                  type="range"
                  className="form-range"
                  id="prazo"
                  name="prazo"
                  min="3"
                  max="35"
                  value={prazo}
                  onChange={handlePrazoChange}
                />
                <div>{prazo} anos</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="fgts">Possui FGTS?</label>
                <div className="btn-group" role="group" aria-label="FGTS options">
                  <button
                    type="button"
                    className={`btn ${fgts === true ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => handleFgtsChange(true)}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={`btn ${fgts === false ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => handleFgtsChange(false)}
                  >
                    Não
                  </button>
                </div>
                {fgts && (
                  <div className="mt-3">
                    <label className="form-label" htmlFor="valor-fgts">Valor do FGTS (R$):</label>
                    <input
                      className={`form-control ${errors.valorFgts ? 'is-invalid' : ''}`}
                      type="text"
                      id="valor-fgts"
                      name="valorFgts"
                      value={valorFgts}
                      onChange={handleValorFgtsChange}
                      placeholder="Digite o valor do FGTS"
                      required
                    />
                    {errors.valorFgts && (
                      <Alert severity="error" className="mt-2">
                        {errors.valorFgts}
                      </Alert>
                    )}
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-continuar" type="submit">Simular</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;
