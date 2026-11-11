import { Address, AddressData } from './address.model';
import { CommunityResponsible, CommunityResponsibleData } from './community-responsible.model';


export interface CommunityData {
  nome: string;
  endereco: AddressData;
  responsaveis: CommunityResponsibleData[];
  nomeAglomerado: string;
  qtdAgriculturaFamiliar: number;
  qtdFamiliaIndigena: number;
  qtdFamiliaQuilombola: number;
  qtdFamiliaReservaExtrativista: number;
  qtdAssentamentoReformaAgraria: number;
  qtdAssentamentoCreditoFunciario: number;
  qtdOngs: number;
  qtdBeneficiariosComunidade: number;
  observacao: string | null;
}


export interface CommunityProperties {
  id: string; 
  name: string;
  address: Address; 
  responsible: CommunityResponsible[]; 
  clusterName: string;
  familyFarmingCount: number;
  indigenousFamilyCount: number;
  quilombolaFamilyCount: number;
  extractiveReserveFamilyCount: number;
  agrarianReformSettlementFamilyCount: number;
  creditLandSettlementCount: number;
  ongCount: number;
  communityBeneficiariesCount: number;
  obs: string | null;
}


export class Community {
  id: string;
  name: string;
  address: Address;
  responsible: CommunityResponsible[];
  clusterName: string;
  familyFarmingCount: number;
  indigenousFamilyCount: number;
  quilombolaFamilyCount: number;
  extractiveReserveFamilyCount: number;
  agrarianReformSettlementFamilyCount: number;
  creditLandSettlementCount: number;
  ongCount: number;
  communityBeneficiariesCount: number;
  obs: string | null;
  
  constructor(options: CommunityProperties) {
    this.id = options.id;
    this.name = options.name;
    this.address = options.address;
    this.responsible = options.responsible;
    this.clusterName = options.clusterName;
    this.familyFarmingCount = options.familyFarmingCount;
    this.indigenousFamilyCount = options.indigenousFamilyCount;
    this.quilombolaFamilyCount = options.quilombolaFamilyCount;
    this.extractiveReserveFamilyCount = options.extractiveReserveFamilyCount;
    this.agrarianReformSettlementFamilyCount = options.agrarianReformSettlementFamilyCount;
    this.creditLandSettlementCount = options.creditLandSettlementCount;
    this.ongCount = options.ongCount;
    this.communityBeneficiariesCount = options.communityBeneficiariesCount;
    this.obs = options.obs;
  }


  static fromFirestore(data: CommunityData, id: string): Community {
    return new Community({
      id: id,
      name: data.nome,
      address: Address.fromFirestore(data.endereco),
      responsible: data.responsaveis.map(resp => CommunityResponsible.fromFirestore(resp)),
      clusterName: data.nomeAglomerado,
      familyFarmingCount: data.qtdAgriculturaFamiliar,
      indigenousFamilyCount: data.qtdFamiliaIndigena,
      quilombolaFamilyCount: data.qtdFamiliaQuilombola,
      extractiveReserveFamilyCount: data.qtdFamiliaReservaExtrativista,
      agrarianReformSettlementFamilyCount: data.qtdAssentamentoReformaAgraria,
      creditLandSettlementCount: data.qtdAssentamentoCreditoFunciario,
      ongCount: data.qtdOngs,
      communityBeneficiariesCount: data.qtdBeneficiariosComunidade,
      obs: data.observacao || null
    });
  }


  public toFirestore(): CommunityData {
    return {
      nome: this.name,
      endereco: this.address.toFirestore(),
      responsaveis: this.responsible.map(resp => resp.toFirestore()),
      nomeAglomerado: this.clusterName,
      qtdAgriculturaFamiliar: this.familyFarmingCount,
      qtdFamiliaIndigena: this.indigenousFamilyCount,
      qtdFamiliaQuilombola: this.quilombolaFamilyCount,
      qtdFamiliaReservaExtrativista: this.extractiveReserveFamilyCount,
      qtdAssentamentoReformaAgraria: this.agrarianReformSettlementFamilyCount,
      qtdAssentamentoCreditoFunciario: this.creditLandSettlementCount,
      qtdOngs: this.ongCount,
      qtdBeneficiariosComunidade: this.communityBeneficiariesCount,
      observacao: this.obs
    };
  }


  public get fullAddress(): string {
    let textComplement = "";
    if (this.address.complement && this.address.complement.trim()) {
      textComplement = `\nComplemento: ${this.address.complement}`;
    }
    return `CEP: ${this.address.zipCode}, nº ${this.address.streetAddress}${textComplement}`;
  }
}