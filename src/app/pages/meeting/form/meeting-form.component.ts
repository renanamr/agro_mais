import { Component, OnInit, signal } from '@angular/core';
import { Meeting, MeetingData } from '../models/meeting.model';
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
        const data = snap.data() as MeetingData;
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

  async save() {
    if (!this.meeting()) return;

    this.loading.set(true);
    try {
      if (this.isEdit()) {
        await this.meetingService.updateMeeting(this.meeting()!);
      } else {
        await this.meetingService.createMeeting(this.meeting()!);
      }
      this.router.navigate(['/reunioes']);
    } catch (error) {
      alert('Erro ao salvar');
    } finally {
      this.loading.set(false);
    }
  }

  cancel() {
    this.router.navigate(['/reunioes']);
  }
}