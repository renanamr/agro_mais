import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { User } from '../../models/user';
import { UserDataService } from '../user/service/user-data.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    CardComponent,
    ItemTableComponent,
    TableHeader,
    HeaderComponent,
    LoadingComponent
],
templateUrl: './admin.component.html',
styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {

  // Signal para controlar o estado de carregamento
  public loading = signal<boolean>(true);

  constructor(
    public userDataService: UserDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Função assíncrona para buscar os usuários.
   * Controla o estado de 'loading'.
   */
  async loadUsers() {
    this.loading.set(true); // Começa o loading
    try {
      await this.userDataService.loadUserList();
    } catch (error) {
      console.error('Erro ao carregar lista de usuários', error);
    } finally {
      this.loading.set(false); // Termina o loading (com sucesso ou erro)
    }
  }

  onEditUser(user: User) {
    this.router.navigate(['/permissoes/editar', user.id]);
  }
}