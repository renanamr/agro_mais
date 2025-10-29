import { Component } from '@angular/core';
import { CardComponent } from '../../components/card-page/card-page';
import { ItemTableComponent } from '../../components/item-table/item-table';
import { CommonModule } from '@angular/common';
import { TableHeader } from "../../components/table-header/table-header";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-agent',
  imports: [
    CommonModule,
    CardComponent,
    ItemTableComponent,
    TableHeader,
    HeaderComponent
],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css',
})
export class AgentComponent {

  // Seus dados estáticos de usuários
  users = [
    { name: 'Ednaldo Bezerra', email: 'ednaldo@exemplo.com', role: 'Liderança', status: 'Ativo' },
    { name: 'Newton Lope...', email: 'newton@exemplo.com', role: 'Agente', status: 'Ativo' },
    { name: 'Ronielinson Fr...', email: 'roni@exemplo.com', role: 'Liderança', status: 'Inativo' },
    { name: 'Jefferson Lei...', email: 'jeff@exemplo.com', role: 'Admin', status: 'Ativo' },
  ];

  onNewAgent() {
    alert('Função "Novo Usuário" chamada!');
  }

  onEditAgent(user: any) {
    alert('Editar usuário: ' + user.name);
  }

  onViewAgent(user: any) {
    alert('Visualizar usuário: ' + user.name);
  }
}
