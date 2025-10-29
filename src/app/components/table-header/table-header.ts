import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table-header',
  imports: [CommonModule],
  templateUrl: './table-header.html',
  styleUrl: './table-header.css',
  host: {
    'class': 'row g-0 p-3 fw-bold text-muted rounded-top'
  }
})
export class TableHeader {

}
