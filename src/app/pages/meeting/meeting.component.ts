import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { Meeting } from './models/meeting.model';
import { MeetingService } from '../meeting/service/meeting.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ItemTableComponent,
    TableHeader,
    HeaderComponent,
    LoadingComponent
  ],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css',
})
export class MeetingComponent implements OnInit {

  public loading = signal<boolean>(true);

  constructor(
    public meetingService: MeetingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMeetings();
  }

  async loadMeetings() {
    this.loading.set(true);
    try {
      await this.meetingService.loadMeetingList();
    } catch (error) {
      console.error('Erro ao carregar reuniões', error);
    } finally {
      this.loading.set(false);
    }
  }

  onNewMeeting() {
    this.router.navigate(['/reunioes/novo']);
  }

  onEditMeeting(meeting: Meeting) {
    this.router.navigate(['/reunioes/editar', meeting.id]);
  }

  onViewMeeting(meeting: Meeting) {
    this.router.navigate(['/reunioes/visualizar', meeting.id]);
  }

  async onDeleteMeeting(meeting: Meeting) {
    const confirmation = confirm(`Tem certeza que deseja excluir a reunião "${meeting.title}"?`);

    if (!confirmation) return;

    try {
      await this.meetingService.deleteMeeting(meeting.id);
      this.loadMeetings(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao deletar reunião:', error);
      alert('Erro ao excluir a reunião.');
    }
  }
}