import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CommunityComponent } from './pages/community/community.component';
import { VisitComponent } from './pages/visit/visit.component';
import { WorkshopComponent } from './pages/workshop/workshop.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { 
    path: 'usuarios', 
    title: "Usuários",
    component: UserComponent
  },
  { 
    path: 'comunidades', 
    title: "Comunidades",
    component: CommunityComponent
  },
  { 
    path: 'visitas', 
    title: "Visitas",
    component: VisitComponent
  },
  { 
    path: 'oficinas', 
    title: "Oficinas",
    component: WorkshopComponent
  },
  { 
    path: 'reunioes', 
    title: "Reuniões",
    component: MeetingComponent
  },
  { 
    path: 'admin', 
    title: "Administradores",
    component: AdminComponent
  },
  { path: '**', redirectTo: '' }
];