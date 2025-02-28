import pool from '../config/database';
import { Address } from '../interfaces/Address';

export class AddressRepository {
  static async create(address: Address): Promise<void> {
    await pool.execute(
      `INSERT INTO addresses (user_id, cep, logradouro, numero, complemento, bairro, cidade, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [address.userId, address.cep, address.logradouro, address.numero, address.complemento || null, address.bairro, address.cidade, address.estado]
    );
  }
}
