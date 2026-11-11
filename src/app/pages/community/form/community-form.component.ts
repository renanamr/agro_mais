import { Component, OnInit, signal } from '@angular/core';
import { Community, CommunityProperties } from '../models/community.model';
import { CommunityService } from '../service/community.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ContainerFormComponent } from "../../../components/container-form/container-form.component";
import { Address } from '../models/address.model';

@Component({
  selector: 'app-community-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LoadingComponent, ContainerFormComponent],
  templateUrl: './community-form.component.html',
  styleUrl: './community-form.component.css'
})
export class CommunityFormComponent implements OnInit {
  community = signal<Community | null>(null);
  isEdit = signal(false);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CommunityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!id);
    id ? this.load(id) : this.new();
  }

  async load(id: string) {
    this.loading.set(true);
    try {
      const snap = await getDoc(doc(this.service['firestore'], `communities/${id}`));
      if (snap.exists()) {
        this.community.set(Community.fromFirestore(snap.data() as any, id));
      }
    } finally {
      this.loading.set(false);
    }
  }

  new() {
  this.community.set(new Community({
    id: '',
    name: '',
    address: new Address({
      zipCode: '',
      streetAddress: null,
      complement: null,
      city: '',
      state: ''
    }),
    responsible: [],
    clusterName: '',
    familyFarmingCount: 0,
    indigenousFamilyCount: 0,
    quilombolaFamilyCount: 0,
    extractiveReserveFamilyCount: 0,
    agrarianReformSettlementFamilyCount: 0,
    creditLandSettlementCount: 0,
    ongCount: 0,
    communityBeneficiariesCount: 0,
    obs: null
  }));
  
  this.loading.set(false);
}

updateAddressField(field: keyof Address, value: any) {
  const current = this.community();
  if (!current) return;

  const updatedAddress = new Address({
    zipCode: current.address.zipCode,
    streetAddress: current.address.streetAddress,
    complement: current.address.complement,
    city: current.address.city,
    state: current.address.state,
    [field]: value
  });

  this.updateField('address', updatedAddress);
}


  updateField(field: keyof CommunityProperties, value: any) {
  const current = this.community();
  if (current) {
    const updated: CommunityProperties = {
      id: current.id,
      name: current.name,
      address: current.address,
      responsible: current.responsible,
      clusterName: current.clusterName,
      familyFarmingCount: current.familyFarmingCount,
      indigenousFamilyCount: current.indigenousFamilyCount,
      quilombolaFamilyCount: current.quilombolaFamilyCount,
      extractiveReserveFamilyCount: current.extractiveReserveFamilyCount,
      agrarianReformSettlementFamilyCount: current.agrarianReformSettlementFamilyCount,
      creditLandSettlementCount: current.creditLandSettlementCount,
      ongCount: current.ongCount,
      communityBeneficiariesCount: current.communityBeneficiariesCount,
      obs: current.obs,
      [field]: value
    };

    this.community.set(new Community(updated));
  }
}

  async save() {
    const w = this.community();
    if (!w) return;
    this.loading.set(true);
    try {
      this.isEdit()
        ? await this.service.updateCommunity(w)
        : await this.service.createCommunity(w);
      this.router.navigate(['/comunidades']);
    } catch {
      alert('Erro ao salvar');
    } finally {
      this.loading.set(false);
    }
  }

  cancel() { this.router.navigate(['/comunidades']); }
}