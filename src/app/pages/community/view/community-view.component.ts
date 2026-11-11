import { Component, OnInit, signal } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from '../service/community.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-community-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingComponent],
  templateUrl: './community-view.component.html',
  styleUrl: './community-view.component.css'
})
export class CommunityViewComponent implements OnInit {
  community = signal<Community | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CommunityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadCommunity(id);
  }

  async loadCommunity(id: string) {
    this.loading.set(true);
    try {
      const docRef = doc(this.service['firestore'], `communitys/${id}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        this.community.set(Community.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  quebrasDeLinha(texto: string | null | undefined): string {
    return texto ? texto.replace(/\n/g, '<br>') : '';
  }

  edit() {
    this.router.navigate(['/comunidades/editar', this.community()?.id]);
  }

  back() {
    this.router.navigate(['/comunidades']);
  }
}