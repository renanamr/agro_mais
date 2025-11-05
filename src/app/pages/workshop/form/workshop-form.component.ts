// src/app/pages/workshop/form/workshop-form.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { Workshop, WorkshopProperties } from '../models/workshop.model';
import { WorkshopService } from '../service/workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ContainerFormComponent } from "../../../components/container-form/container-form.component";

@Component({
  selector: 'app-workshop-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LoadingComponent, ContainerFormComponent],
  templateUrl: './workshop-form.component.html',
  styleUrl: './workshop-form.component.css'
})
export class WorkshopFormComponent implements OnInit {
  workshop = signal<Workshop | null>(null);
  isEdit = signal(false);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WorkshopService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!id);
    id ? this.load(id) : this.new();
  }

  async load(id: string) {
    this.loading.set(true);
    try {
      const snap = await getDoc(doc(this.service['firestore'], `workshops/${id}`));
      if (snap.exists()) {
        this.workshop.set(Workshop.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  new() {
    this.workshop.set(new Workshop({
      id: '', title: '', startTime: '', endTime: '', durationHours: 0,
      maxParticipants: 0, description: '', notes: '', agentName: '',
      communityName: '', schedulingPersonName: '', cancelPersonName: null
    }));
    this.loading.set(false);
  }

  updateField(field: keyof Workshop, value: any) {
    const current = this.workshop();
    if (current) {
      const updated: WorkshopProperties = {
        id: current.id,
        title: current.title,
        startTime: current.startTime,
        endTime: current.endTime,
        durationHours: current.durationHours,
        maxParticipants: current.maxParticipants,
        description: current.description,
        notes: current.notes,
        agentName: current.agentName,
        communityName: current.communityName,
        schedulingPersonName: current.schedulingPersonName,
        cancelPersonName: current.cancelPersonName,
        [field]: value
      };
      this.workshop.set(new Workshop(updated));
    }
  }

  async save() {
    const w = this.workshop();
    if (!w) return;
    this.loading.set(true);
    try {
      this.isEdit()
        ? await this.service.updateWorkshop(w)
        : await this.service.createWorkshop(w);
      this.router.navigate(['/oficinas']);
    } catch {
      alert('Erro ao salvar');
    } finally {
      this.loading.set(false);
    }
  }

  cancel() { this.router.navigate(['/oficinas']); }
}