export interface User {
  id?: number;
  tipo: 'fisica' | 'juridica';
  cnpj?: string;
  cpf: string;
  nome: string;
  email: string;
  telefone?: string;
  celular: string;
}
