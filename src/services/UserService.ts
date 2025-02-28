import { UserRepository } from '../repositories/UserRepository';
import { AddressRepository } from '../repositories/AddressRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export class UserService {
  static async create(userData: CreateUserDTO): Promise<string> {
    const userId = await UserRepository.create(userData);
    await AddressRepository.create({ ...userData.endereco, userId });

    return "Usuário cadastrado com sucesso";
  }
}
