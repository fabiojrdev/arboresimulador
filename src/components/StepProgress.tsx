import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../styles/StepProgress.css';

const StepProgress = ({ currentStep, hasEtapa2 = true }) => {
  const steps = hasEtapa2
    ? [
        { label: 'Informações Pessoais', icon: 'bi bi-person' },
        { label: 'Informações Adicionais', icon: 'bi bi-info-circle' },
        { label: 'Simulação', icon: 'bi bi-calculator' }
      ]
    : [
        { label: 'Informações Pessoais', icon: 'bi bi-person' },
        { label: 'Simulação', icon: 'bi bi-calculator' }
      ];

  return (
    <div className="step-progress">
      <ul className="step-progress-bar">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`step-progress-item ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
          >
            <div className="step-icon">
              <i className={step.icon}></i>
            </div>
            <div className="step-label">{step.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepProgress;
