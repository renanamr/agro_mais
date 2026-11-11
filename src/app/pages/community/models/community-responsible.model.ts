export interface CommunityResponsibleData {
    id: number | null;
    nome: string;
    cpf: string;
    email: string | null;
    telefone: string | null;
  }
  
 
  export interface CommunityResponsibleProperties {
    id: number | null;
    name: string;
    cpf: string;
    email: string | null;
    phone: string | null;
  }
  

  export class CommunityResponsible {
    id: number | null;
    name: string;
    cpf: string;
    email: string | null;
    phone: string | null;
  
    constructor(options: CommunityResponsibleProperties) {
      this.id = options.id;
      this.name = options.name;
      this.cpf = options.cpf;
      this.email = options.email;
      this.phone = options.phone;
    }
  
    static fromFirestore(data: CommunityResponsibleData): CommunityResponsible {
      return new CommunityResponsible({
        id: data.id || null,
        name: data.nome,
        cpf: data.cpf,
        email: data.email || null,
        phone: data.telefone || null
      });
    }
  
    public toFirestore(): CommunityResponsibleData {
      return {
        id: this.id,
        nome: this.name,
        cpf: this.cpf,
        email: this.email,
        telefone: this.phone
      };
    }
  }