//Define os papéis (perfis) de usuário permitidos no sistema.
export type UserRole = 'admin' | 'agente';

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
}

export class User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  role: UserRole;
  phone: string;

  constructor(options: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    role: UserRole;
    phone: string;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.email = options.email;
    this.cpf = options.cpf;
    this.birthDate = options.birthDate;
    this.role = options.role;
    this.phone = options.phone;
  }


  static fromFirestore(data: UsuarioData, id: string): User {
    return new User({
      id: id,
      name: data.nome,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.dataNascimento,
      role: data.papel,
      phone: data.telefone
    });
  }

  public toFirestore(): UsuarioData {
    return {
      nome: this.name,
      email: this.email,
      cpf: this.cpf,
      dataNascimento: this.birthDate,
      papel: this.role,
      telefone: this.phone
    };
  }
}