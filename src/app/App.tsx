import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Cadastro from '../components/cadastro.tsx';
import CadastroSimplificado from '../components/CadastroSimplificado.tsx';
import Dashboard from '../components/Dashboard.tsx';
import Header from '../components/Header.tsx';
import Simulador from '../components/simulador.tsx';
import StepProgress from '../components/StepProgress.tsx';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dadosCadastro, setDadosCadastro] = useState({});
  const [dataSimulacao, setDataSimulacao] = useState({});
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source'),
      utm_campaign: params.get('utm_campaign'),
      utm_medium: params.get('utm_medium'),
    });
  }, []);

  const handleNext = (data) => {
  if (currentStep === 0) {
    setDadosCadastro(data);
    setCurrentStep(1);
  } else if (currentStep === 1) {
    setDataSimulacao(data);
    
    // Enviar todos os dados apenas quando estiverem completos
    const dadosCompletos = { ...dadosCadastro, ...data, ...utmParams };
    enviarDadosParaWebhook(dadosCompletos);

    setCurrentStep(2);
  }
};


  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const enviarDadosParaWebhook = (dados) => {
  fetch('https://hook.us2.make.com/2o2vdrqsgycy1ylqwl4o5rvvylhgxtbm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao enviar dados ao Webhook');
      return response.text();
    })
    .then(data => console.log('Lead enviado com sucesso:', data))
    .catch(error => console.error('Erro ao enviar lead:', error));
};

  const AppWithStepProgress = () => {
    const location = useLocation();
    const isSimplificado = location.pathname === '/simplificado';

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      setUtmParams({
        utm_source: params.get('utm_source'),
        utm_campaign: params.get('utm_campaign'),
        utm_medium: params.get('utm_medium'),
      });
    }, [location]);

    return (
      <>
        <Header />
        <StepProgress currentStep={currentStep} hasEtapa2={!isSimplificado} />
        <Routes>
          <Route
            path="/"
            element={
              <Cadastro
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
              />
            }
          />
          <Route
            path="/simplificado"
            element={
              <CadastroSimplificado
                onNext={(data) => {
                  enviarDadosParaWebhook(data); // Enviar direto no simplificado
                  handleNext(data);
                }}
              />
            }
          />
          <Route
            path="/simulador"
            element={
              <Simulador
                onNext={(data) => {
                  setDataSimulacao(data);
                  enviarDadosParaWebhook({ ...dadosCadastro, ...data });
                  setCurrentStep(2);
                }}
                onBack={handleBack}
                currentStep={currentStep}
                dadosCadastro={dadosCadastro}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard dataSimulacao={dataSimulacao} />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <AppWithStepProgress />
    </Router>
  );
};

export default App;
