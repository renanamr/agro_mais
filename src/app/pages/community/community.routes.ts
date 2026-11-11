import { Routes } from '@angular/router';

export const communityRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./community.component').then(m => m.CommunityComponent)
  },
  {
    path: 'novo',
    loadComponent: () => import('./form/community-form.component').then(m => m.CommunityFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./form/community-form.component').then(m => m.CommunityFormComponent)
  },
  {
    path: 'visualizar/:id',
    loadComponent: () => import('./view/community-view.component').then(m => m.CommunityViewComponent)
  }
];