// src/utils/calculateSAC.js
export function calculateSAC(loanAmount, interestRate, numInstallments) {
  const amortization = loanAmount / numInstallments;
  let lastInstallment = 0;

  for (let i = 0; i < numInstallments; i++) {
    const remainingPrincipal = loanAmount - i * amortization;
    const interest = remainingPrincipal * (interestRate / 100) / 12; // Taxa de juros mensal
    const installment = amortization + interest;
    lastInstallment = installment;
  }

  return lastInstallment;
}
