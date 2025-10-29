export interface MeetingData {
    dataReuniao: string;     
    horaInicio: string;      
    horaFim: string;         
    titulo: string;
    observacoes: string;
    ataReuniao: string;
    nomeAgente: string;
    nomeComunidade: string;
    nomeAgendador: string;    
    nomeCancelador: string | null; 
  }
  

  export interface MeetingProperties {
    id: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    title: string;
    notes: string;
    meetingMinutes: string;
    agentName: string;
    communityName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
  }
  

  export class Meeting {
    id: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    title: string;
    notes: string;
    meetingMinutes: string;
    agentName: string;
    communityName: string;
    schedulingPersonName: string;
    cancelPersonName: string | null;
  
    constructor(options: MeetingProperties) {
      this.id = options.id;
      this.meetingDate = options.meetingDate;
      this.startTime = options.startTime;
      this.endTime = options.endTime;
      this.title = options.title;
      this.notes = options.notes;
      this.meetingMinutes = options.meetingMinutes;
      this.agentName = options.agentName;
      this.communityName = options.communityName;
      this.schedulingPersonName = options.schedulingPersonName;
      this.cancelPersonName = options.cancelPersonName;
    }
  

    static fromFirestore(data: MeetingData, id: string): Meeting {
      return new Meeting({
        id: id,
        meetingDate: data.dataReuniao,
        startTime: data.horaInicio,
        endTime: data.horaFim,
        title: data.titulo,
        notes: data.observacoes,
        meetingMinutes: data.ataReuniao,
        agentName: data.nomeAgente,
        communityName: data.nomeComunidade,
        schedulingPersonName: data.nomeAgendador,
        cancelPersonName: data.nomeCancelador || null
      });
    }
  

    public toFirestore(): MeetingData {
      return {
        dataReuniao: this.meetingDate,
        horaInicio: this.startTime,
        horaFim: this.endTime,
        titulo: this.title,
        observacoes: this.notes,
        ataReuniao: this.meetingMinutes,
        nomeAgente: this.agentName,
        nomeComunidade: this.communityName,
        nomeAgendador: this.schedulingPersonName,
        nomeCancelador: this.cancelPersonName
      };
    }
  }