import { Routes } from '@angular/router';

export const visitRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./visit.component').then(v => v.VisitComponent)
  },
  {
    path: 'novo',
    loadComponent: () => import('./form/visit-form.component').then(v => v.VisitFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./form/visit-form.component').then(v => v.VisitFormComponent)
  },
  {
    path: 'visualizar/:id',
    loadComponent: () => import('./view/visit-view.component').then(v => v.VisitViewComponent)
  }
];