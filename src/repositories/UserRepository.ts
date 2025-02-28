import pool from '../config/database';
import { User } from '../interfaces/User';

export class UserRepository {
  static async create(user: User): Promise<number> {
    const [result] = await pool.execute(
      `INSERT INTO users (tipo, cnpj, cpf, nome, email, telefone, celular)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user.tipo, user.cnpj || null, user.cpf, user.nome, user.email, user.telefone || null, user.celular]
    );

    return (result as any).insertId;
  }

  static async existsByCpfOrEmail(cpf: string, email: string): Promise<boolean> {
    const [rows]: any = await pool.execute(
      `SELECT 1 FROM users WHERE cpf = ? OR email = ? LIMIT 1`,
      [cpf, email]
    );
    return rows.length > 0;
  }
}
