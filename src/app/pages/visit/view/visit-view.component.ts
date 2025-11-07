import { Component, OnInit, signal } from '@angular/core';
import { Visit } from '../models/visit.model';
import { VisitService } from '../service/visit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-visit-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingComponent],
  templateUrl: './visit-view.component.html',
  styleUrl: './visit-view.component.css'
})
export class VisitViewComponent implements OnInit {
  visit = signal<Visit | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VisitService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadVisit(id);
  }

  async loadVisit(id: string) {
    this.loading.set(true);
    try {
      const docRef = doc(this.service['firestore'], `visits/${id}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        this.visit.set(Visit.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  quebrasDeLinha(texto: string | null | undefined): string {
    return texto ? texto.replace(/\n/g, '<br>') : '';
  }

  edit() {
    this.router.navigate(['/visitas/editar', this.visit()?.id]);
  }

  back() {
    this.router.navigate(['/visitas']);
  }
}