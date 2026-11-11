import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { Visit } from './models/visit.model';
import { VisitService } from './service/visit.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [CommonModule, CardComponent, ItemTableComponent, TableHeader, HeaderComponent, LoadingComponent],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent implements OnInit {
  loading = signal(true);

  constructor(public visitService: VisitService, private router: Router) {}

  ngOnInit() {
    this.loadVisits();
  }

  async loadVisits() {
    this.loading.set(true);
    await this.visitService.loadVisitList();
    this.loading.set(false);
  }

  onNew() { this.router.navigate(['/visitas/novo']); }
  onEdit(v: Visit) { this.router.navigate(['/visitas/editar', v.id]); }
  onView(v: Visit) { this.router.navigate(['/visitas/visualizar', v.id]); }
  async onDelete(v: Visit) {
    if (confirm(`Excluir "${v.purpose}"?`)) {
      await this.visitService.deleteVisit(v.id);
      this.loadVisits();
    }
  }
}