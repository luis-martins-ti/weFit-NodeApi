import { Address } from "../interfaces/Address";
import { User } from "../interfaces/User";

export interface CreateUserDTO extends User {
  endereco: Address;
}
