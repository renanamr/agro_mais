// src/app/pages/workshop/workshop.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { Workshop } from './models/workshop.model';
import { WorkshopService } from './service/workshop.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [CommonModule, CardComponent, ItemTableComponent, TableHeader, HeaderComponent, LoadingComponent],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.css'
})
export class WorkshopComponent implements OnInit {
  loading = signal(true);

  constructor(public workshopService: WorkshopService, private router: Router) {}

  ngOnInit() {
    this.loadWorkshops();
  }

  async loadWorkshops() {
    this.loading.set(true);
    await this.workshopService.loadWorkshopList();
    this.loading.set(false);
  }

  onNew() { this.router.navigate(['/oficinas/novo']); }
  onEdit(w: Workshop) { this.router.navigate(['/oficinas/editar', w.id]); }
  onView(w: Workshop) { this.router.navigate(['/oficinas/visualizar', w.id]); }
  async onDelete(w: Workshop) {
    if (confirm(`Excluir "${w.title}"?`)) {
      await this.workshopService.deleteWorkshop(w.id);
      this.loadWorkshops();
    }
  }
}