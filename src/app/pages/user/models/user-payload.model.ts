import { UserRole, UserStatus } from "../../../models/user";

// Interface para o payload de criação de usuário
export interface CreateUserPayload {
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    role: UserRole;
    phone: string;
    status: UserStatus;
    password: string;
  }