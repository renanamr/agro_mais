import { Component, OnInit, signal } from '@angular/core';
import { Visit, VisitProperties } from '../models/visit.model';
import { VisitService } from '../service/visit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ContainerFormComponent } from "../../../components/container-form/container-form.component";

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LoadingComponent, ContainerFormComponent],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit {

  visit = signal<Visit | null>(null);
  isEdit = signal(false);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VisitService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!id);
    id ? this.load(id) : this.new();
  }

  async load(id: string) {
    this.loading.set(true);
    try {
      const snap = await getDoc(doc(this.service['firestore'], `visits/${id}`));
      if (snap.exists()) {
        this.visit.set(Visit.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  /* -----------------------------
     NOVO VISIT (somente atributos
     existentes em VisitProperties)
  ------------------------------ */
  new() {
    this.visit.set(new Visit({
      id: '',
      visitDate: '',
      startTime: '',
      endTime: null,
      purpose: '',
      agentName: null,
      communityName: null,
      state: null,
      clusterId: null,
      clusterName: '',
      schedulingPersonName: '',
      cancelPersonName: null,
      notes: ''
    }));

    this.loading.set(false);
  }
  
  updateField(field: keyof VisitProperties, value: any) {
    const current = this.visit();
    if (!current) return;

    const updated: VisitProperties = {
      id: current.id,
      visitDate: current.visitDate,
      startTime: current.startTime,
      endTime: current.endTime,
      purpose: current.purpose,
      agentName: current.agentName,
      communityName: current.communityName,
      state: current.state,
      clusterId: current.clusterId,
      clusterName: current.clusterName,
      schedulingPersonName: current.schedulingPersonName,
      cancelPersonName: current.cancelPersonName,
      notes: current.notes,
      [field]: value
    };

    this.visit.set(new Visit(updated));
  }

  async save() {
    const v = this.visit();
    if (!v) return;

    this.loading.set(true);

    try {
      this.isEdit()
        ? await this.service.updateVisit(v)
        : await this.service.createVisit(v);

      this.router.navigate(['/visitas']);

    } catch {
      alert('Erro ao salvar');
    } finally {
      this.loading.set(false);
    }
  }

  cancel() {
    this.router.navigate(['/visitas']);
  }
}
