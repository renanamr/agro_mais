export interface AddressData {
    cep: string;
    logradouro: string | null;
    complemento: string | null;
    cidade: string;
    estado: string;
  }
  

  export interface AddressProperties {
    zipCode: string;
    streetAddress: string | null;
    complement: string | null;
    city: string;
    state: string;
  }
  

  export class Address {
    zipCode: string;
    streetAddress: string | null;
    complement: string | null;
    city: string;
    state: string;
  
    constructor(options: AddressProperties) {
      this.zipCode = options.zipCode;
      this.streetAddress = options.streetAddress;
      this.complement = options.complement;
      this.city = options.city;
      this.state = options.state;
    }
  
    static fromFirestore(data: AddressData): Address {
      return new Address({
        zipCode: data.cep,
        streetAddress: data.logradouro || null,
        complement: data.complemento || null,
        city: data.cidade,
        state: data.estado
      });
    }
  
    public toFirestore(): AddressData {
      return {
        cep: this.zipCode,
        logradouro: this.streetAddress,
        complemento: this.complement,
        cidade: this.city,
        estado: this.state
      };
    }
  }