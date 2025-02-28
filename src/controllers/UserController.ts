import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { body, validationResult } from 'express-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { UserRepository } from '../repositories/UserRepository';

export const validateUser = [
  body('tipo').isIn(['fisica', 'juridica']).withMessage('Tipo inválido'),

  body('cnpj')
    .if(body('tipo').equals('juridica'))
    .notEmpty().withMessage('CNPJ obrigatório')
    .custom(value => cnpj.isValid(value)).withMessage('CNPJ inválido'),

  body('cpf')
    .if(body('tipo').equals('fisica'))
    .notEmpty().withMessage('CPF obrigatório')
    .custom(value => cpf.isValid(value)).withMessage('CPF inválido')
    .custom(async (value) => {
      const exists = await UserRepository.existsByCpfOrEmail(value, '');
      if (exists) {
        throw new Error('CPF já cadastrado');
      }
    }),

  body('email')
    .isEmail().withMessage('Email inválido')
    .custom(async (value) => {
      const exists = await UserRepository.existsByCpfOrEmail('', value);
      if (exists) {
        throw new Error('E-mail já cadastrado');
      }
    }),

  body('nome').notEmpty().withMessage('Nome obrigatório'),
  body('celular').notEmpty().withMessage('Celular obrigatório'),
  body('endereco.cep').notEmpty().withMessage('CEP obrigatório'),
  body('endereco.logradouro').notEmpty().withMessage('Logradouro obrigatório'),
  body('endereco.numero').notEmpty().withMessage('Número obrigatório'),
  body('endereco.bairro').notEmpty().withMessage('Bairro obrigatório'),
  body('endereco.cidade').notEmpty().withMessage('Cidade obrigatória'),
  body('endereco.estado').notEmpty().withMessage('Estado obrigatório'),
];

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const message = await UserService.create(req.body);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};
