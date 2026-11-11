// src/app/pages/workshop/workshop.routes.ts
import { Routes } from '@angular/router';

export const workshopRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./workshop.component').then(m => m.WorkshopComponent)
  },
  {
    path: 'novo',
    loadComponent: () => import('./form/workshop-form.component').then(m => m.WorkshopFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./form/workshop-form.component').then(m => m.WorkshopFormComponent)
  },
  {
    path: 'visualizar/:id',
    loadComponent: () => import('./view/workshop-view.component').then(m => m.WorkshopViewComponent)
  }
];