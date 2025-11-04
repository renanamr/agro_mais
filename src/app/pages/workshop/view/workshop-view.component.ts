// src/app/pages/workshop/view/workshop-view.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { Workshop } from '../models/workshop.model';
import { WorkshopService } from '../service/workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-workshop-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingComponent],
  templateUrl: './workshop-view.component.html',
  styleUrl: './workshop-view.component.css'
})
export class WorkshopViewComponent implements OnInit {
  workshop = signal<Workshop | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WorkshopService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadWorkshop(id);
  }

  async loadWorkshop(id: string) {
    this.loading.set(true);
    try {
      const docRef = doc(this.service['firestore'], `workshops/${id}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        this.workshop.set(Workshop.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  // MÉTODO NOVO: substitui \n por <br>
  quebrasDeLinha(texto: string | null | undefined): string {
    return texto ? texto.replace(/\n/g, '<br>') : '';
  }

  edit() {
    this.router.navigate(['/oficinas/editar', this.workshop()?.id]);
  }

  back() {
    this.router.navigate(['/oficinas']);
  }
}