
export interface VisitData {
    dataVisita: string;          
    horaInicio: string;          
    horaFim: string | null;      
    proposito: string;
    nomeAgente: string | null;
    nomeComunidade: string | null;
    estado: string | null;
    idAglomerado: number | null; 
    nomeAglomerado: string;
    nomeAgendador: string;
    nomeCancelador: string | null;
    observacoes: string;
  }
  
  export interface VisitProperties {
    id: string;
    visitDate: string;
    startTime: string;
    endTime: string | null;
    purpose: string;
    agentName: string | null;
    communityName: string | null;
    state: string | null;
    clusterId: number | null;
    clusterName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
    notes: string;
  }
  
  export class Visit {
    id: string;
    visitDate: string;
    startTime: string;
    endTime: string | null;
    purpose: string;
    agentName: string | null;
    communityName: string | null;
    state: string | null;
    clusterId: number | null;
    clusterName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
    notes: string;
    
    constructor(options: VisitProperties) {
      this.id = options.id;
      this.visitDate = options.visitDate;
      this.startTime = options.startTime;
      this.endTime = options.endTime;
      this.purpose = options.purpose;
      this.agentName = options.agentName;
      this.communityName = options.communityName;
      this.state = options.state;
      this.clusterId = options.clusterId;
      this.clusterName = options.clusterName;
      this.schedulingPersonName = options.schedulingPersonName;
      this.cancelPersonName = options.cancelPersonName;
      this.notes = options.notes;
    }
  

    static fromFirestore(data: VisitData, id: string): Visit {
      return new Visit({
        id: id,
        visitDate: data.dataVisita,
        startTime: data.horaInicio,
        endTime: data.horaFim || null,
        purpose: data.proposito,
        agentName: data.nomeAgente || null,
        communityName: data.nomeComunidade || null,
        state: data.estado || null,
        clusterId: data.idAglomerado || null,
        clusterName: data.nomeAglomerado,
        schedulingPersonName: data.nomeAgendador,
        cancelPersonName: data.nomeCancelador || null,
        notes: data.observacoes
      });
    }
  
    public toFirestore(): VisitData {
      return {
        dataVisita: this.visitDate,
        horaInicio: this.startTime,
        horaFim: this.endTime,
        proposito: this.purpose,
        nomeAgente: this.agentName,
        nomeComunidade: this.communityName,
        estado: this.state,
        idAglomerado: this.clusterId,
        nomeAglomerado: this.clusterName,
        nomeAgendador: this.schedulingPersonName,
        nomeCancelador: this.cancelPersonName,
        observacoes: this.notes
      };
    }
  }