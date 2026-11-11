import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-page.html',
  styleUrls: ['./card-page.css']
})
export class CardComponent {
  // O título que será exibido (ex: "Listagem de comunidades")
  @Input() title: string = 'Título';
  
  // O texto do botão de ação
  @Input() newButtonText: string = 'Novo';

  // Controla se o botão "Novo" deve aparecer
  @Input( { transform: (value: boolean | string) => (value === '' || value) } ) 
  showNewButton: boolean = true;

  // Evento que será disparado ao clicar em "Novo"
  @Output() newClick = new EventEmitter<void>();

  onNewClick() {
    this.newClick.emit();
  }
}