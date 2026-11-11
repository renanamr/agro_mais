import { Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';

export const meetingRoutes: Routes = [
  { path: '', component: MeetingComponent },
  { path: 'novo', loadComponent: () => import('./form/meeting-form.component').then(m => m.MeetingFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./form/meeting-form.component').then(m => m.MeetingFormComponent) },
  { path: 'visualizar/:id', loadComponent: () => import('./view/meeting-view.component').then(m => m.MeetingViewComponent) },
];
