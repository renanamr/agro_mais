import { Component, OnInit, signal } from '@angular/core';
import { Meeting, MeetingProperties } from '../models/meeting.model'; // ← CORRIGIDO
import { MeetingService } from '../service/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LoadingComponent],
  templateUrl: './meeting-form.component.html',
  styleUrl: './meeting-form.component.css'
})
export class MeetingFormComponent implements OnInit {
  meeting = signal<Meeting | null>(null);
  isEdit = signal(false);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!id);
    if (id) {
      this.loadMeeting(id);
    } else {
      this.newMeeting();
    }
  }

  async loadMeeting(id: string) {
    this.loading.set(true);
    try {
      const docRef = doc(this.meetingService['firestore'], `meetings/${id}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as any;
        this.meeting.set(Meeting.fromFirestore(data, id));
      }
    } catch (error) {
      alert('Erro ao carregar reunião');
    } finally {
      this.loading.set(false);
    }
  }

  newMeeting() {
    this.meeting.set(new Meeting({
      id: '',
      meetingDate: '',
      startTime: '',
      endTime: '',
      title: '',
      notes: '',
      meetingMinutes: '',
      agentName: '',
      communityName: '',
      schedulingPersonName: '',
      cancelPersonName: null
    }));
    this.loading.set(false);
  }

  // MÉTODO CORRIGIDO
updateField(field: keyof Meeting, value: any) {
  const current = this.meeting();
  if (current) {
    const updatedProps: MeetingProperties = {
      id: current.id,
      meetingDate: current.meetingDate,
      startTime: current.startTime,
      endTime: current.endTime,
      title: current.title,
      notes: current.notes,
      meetingMinutes: current.meetingMinutes,
      agentName: current.agentName,
      communityName: current.communityName,
      schedulingPersonName: current.schedulingPersonName,
      cancelPersonName: current.cancelPersonName,
      [field]: value
    };
    this.meeting.set(new Meeting(updatedProps));
  }
}

  async save() {
    const meeting = this.meeting();
    if (!meeting) return;

    this.loading.set(true);
    try {
      if (this.isEdit()) {
        await this.meetingService.updateMeeting(meeting);
      } else {
        await this.meetingService.createMeeting(meeting);
      }
      this.router.navigate(['/reunioes']);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar a reunião.');
    } finally {
      this.loading.set(false);
    }
  }

  cancel() {
    this.router.navigate(['/reunioes']);
  }
}