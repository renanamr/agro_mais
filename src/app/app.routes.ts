import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminFormCompoment } from './pages/admin/form/admin-form.component';
import { UserComponent } from './pages/user/user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { 
    path: 'usuarios', 
    title: "Usuários",
    children: [
      {
        path: '', 
        component: UserComponent 
      },
      {
        path: 'novo', 
        component: UserFormComponent
      },
      {
        path: 'editar/:id', 
        component: UserFormComponent 
      },
      {
        path: 'visualizar/:id', 
        component: UserFormComponent
      }
    ]
  },
  { 
    path: 'comunidades', 
    title: "Comunidades",
    loadChildren: () => import('./pages/community/community.routes').then(c => c.communityRoutes)
  },
  { 
    path: 'visitas', 
    title: "Visitas",
    loadChildren: () => import('./pages/visit/visit.routes').then(v => v.visitRoutes)
  },
  {
    path: 'oficinas',
    title: 'Oficinas',
    loadChildren: () => import('./pages/workshop/workshop.routes').then(m => m.workshopRoutes)
  },
{
  path: 'reunioes',
  title: 'Reuniões',
  loadChildren: () => import('./pages/meeting/meeting.routes').then(m => m.meetingRoutes)
},

  { 
    path: 'permissoes', 
    title: "Administradores",
    children: [
      {
        path: '', 
        component: AdminComponent 
      },
      {
        path: 'editar/:id', 
        component: AdminFormCompoment 
      }
    ]    
  },
  { path: '**', redirectTo: '' }
];