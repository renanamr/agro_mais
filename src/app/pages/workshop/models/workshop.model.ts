export interface WorkshopData {
    titulo: string;
    horaInicio: string;       
    horaFim: string;          
    duracaoHoras: number;      
    maxParticipantes: number;  
    descricao: string;
    notas: string;             
    nomeAgente: string;
    nomeComunidade: string;
    nomeAgendador: string;
    nomeCancelador: string | null;
  }
  
  export interface WorkshopProperties {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    durationHours: number;
    maxParticipants: number;
    description: string;
    notes: string;
    agentName: string;
    communityName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
  }
  
  export class Workshop {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    durationHours: number;
    maxParticipants: number;
    description: string;
    notes: string;
    agentName: string;
    communityName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
  
    constructor(options: WorkshopProperties) {
      this.id = options.id;
      this.title = options.title;
      this.startTime = options.startTime;
      this.endTime = options.endTime;
      this.durationHours = options.durationHours;
      this.maxParticipants = options.maxParticipants;
      this.description = options.description;
      this.notes = options.notes;
      this.agentName = options.agentName;
      this.communityName = options.communityName;
      this.schedulingPersonName = options.schedulingPersonName;
      this.cancelPersonName = options.cancelPersonName;
    }
  
    static fromFirestore(data: WorkshopData, id: string): Workshop {
      return new Workshop({
        id: id,
        title: data.titulo,
        startTime: data.horaInicio,
        endTime: data.horaFim,
        durationHours: data.duracaoHoras,
        maxParticipants: data.maxParticipantes,
        description: data.descricao,
        notes: data.notas,
        agentName: data.nomeAgente,
        communityName: data.nomeComunidade,
        schedulingPersonName: data.nomeAgendador,
        cancelPersonName: data.nomeCancelador || null
      });
    }
  
    public toFirestore(): WorkshopData {
      return {
        titulo: this.title,
        horaInicio: this.startTime,
        horaFim: this.endTime,
        duracaoHoras: this.durationHours,
        maxParticipantes: this.maxParticipants,
        descricao: this.description,
        notas: this.notes,
        nomeAgente: this.agentName,
        nomeComunidade: this.communityName,
        nomeAgendador: this.schedulingPersonName,
        nomeCancelador: this.cancelPersonName
      };
    }
  }