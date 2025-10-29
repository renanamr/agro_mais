import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-table.html',
  styleUrls: ['./item-table.css'],
  host: {
    'class': 'row g-0 p-3 border-bottom align-items-center list-item-hover'
  }
})
export class ItemTableComponent {

  /**
   * Define a largura da coluna de ações (ex: 'col-2').
   * Isso é crucial para o alinhamento.
   */
  @Input() actionsCol: string = 'col-2';

  // Eventos para os botões de ação
  @Output() editClick = new EventEmitter<void>();
  @Output() viewClick = new EventEmitter<void>();
}