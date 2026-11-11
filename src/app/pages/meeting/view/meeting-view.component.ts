import { Component, OnInit, signal } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../service/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { doc, getDoc } from '@angular/fire/firestore';
import { LoadingComponent } from '../../../components/loading/loading.component';



@Component({
  selector: 'app-meeting-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingComponent],
  templateUrl: './meeting-view.component.html',
  styleUrl: './meeting-view.component.css'
})



export class MeetingViewComponent implements OnInit {
  meeting = signal<Meeting | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadMeeting(id);
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
    } finally {
      this.loading.set(false);
    }
  }

  edit() {
    this.router.navigate(['/reunioes/editar', this.meeting()?.id]);
  }

  back() {
    this.router.navigate(['/reunioes']);
  }
}