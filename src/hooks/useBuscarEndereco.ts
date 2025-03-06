import { useState } from 'react';

export const useBuscarEndereco = () => {
  const [endereco, setEndereco] = useState({ logradouro: '', localidade: '', uf: '' });
  const [erro, setErro] = useState('');

  const buscarEndereco = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco({ logradouro: data.logradouro, localidade: data.localidade, uf: data.uf });
          setErro('');
        } else {
          setErro('CEP não encontrado.');
        }
      } catch (error) {
        setErro('Erro ao buscar o CEP.');
      }
    } else {
      setErro('Por favor, insira um CEP válido.');
    }
  };

  return { endereco, erro, buscarEndereco };
};
