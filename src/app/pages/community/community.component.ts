import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { Community } from './models/community.model';
import { CommunityService } from './service/community.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, CardComponent, ItemTableComponent, TableHeader, HeaderComponent, LoadingComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {
  loading = signal(true);

  constructor(public communityService: CommunityService, private router: Router) {}

  ngOnInit() {
    this.loadCommunitys();
  }

  async loadCommunitys() {
    this.loading.set(true);
    await this.communityService.loadCommunityList();
    this.loading.set(false);
  }

  onNew() { this.router.navigate(['/comunidades/novo']); }
  onEdit(c: Community) { this.router.navigate(['/comunidades/editar', c.id]); }
  onView(c: Community) { this.router.navigate(['/comunidades/visualizar', c.id]); }
  async onDelete(c: Community) {
    if (confirm(`Excluir "${c.name}"?`)) {
      await this.communityService.deleteCommunity(c.id);
      this.loadCommunitys();
    }
  }
}