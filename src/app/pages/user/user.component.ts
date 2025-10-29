import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";
import { User } from '../../models/user';
import { UserDataService } from './service/user-data.service';
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
templateUrl: './user.component.html',
styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {

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

  onNewUser() {
    this.router.navigate(['/usuarios/novo']);
  }


  onEditUser(user: User) {
    this.router.navigate(['/usuarios/editar', user.id]);
  }


  onViewUser(user: User) {
    alert('Visualizar usuário: ' + user.name);
  }


  async onDeleteUser(user: User) {
    const confirmation = confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`);

    if (!confirmation) {
      return; // Usuário cancelou
    }

    try {
      await this.userDataService.deleteUser(user.id);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Ocorreu um erro ao tentar excluir o usuário.');
    }
  }
}