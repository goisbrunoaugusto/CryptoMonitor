import Cookies from 'js-cookie';

// Função para verificar autenticação
export const useAuth = () => {
  const userId = Cookies.get('userId'); // Exemplo usando js-cookie
  return !!userId; // Retorna true se userId existir, false caso contrário
};