//Define os papéis (perfis) de usuário permitidos no sistema.
export type UserRole = 'Admin' | 'Agente';
export type UserStatus = 'Ativo' | 'Inativo';

/**
 * Interface auxiliar para os dados brutos do Firestore (Português)
 * Usada APENAS pelos métodos de conversão.
 */
export interface UsuarioData {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  papel: UserRole;
  telefone: string;
  status: UserStatus; 
}

export class User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  role: UserRole;
  phone: string;
  status: UserStatus; 

  constructor(options: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    role: UserRole;
    phone: string;
    status: UserStatus;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.email = options.email;
    this.cpf = options.cpf;
    this.birthDate = options.birthDate;
    this.role = options.role;
    this.phone = options.phone;
    this.status = options.status;
  }


  static fromFirestore(data: UsuarioData, id: string): User {
    return new User({
      id: id,
      name: data.nome,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.dataNascimento,
      role: data.papel,
      phone: data.telefone,
      status: data.status,
    });
  }

  public toFirestore(): UsuarioData {
    return {
      nome: this.name,
      email: this.email,
      cpf: this.cpf,
      dataNascimento: this.birthDate,
      papel: this.role,
      telefone: this.phone,
      status: this.status
    };
  }
}