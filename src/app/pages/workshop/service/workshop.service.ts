// src/app/pages/workshop/service/workshop.service.ts
import { Injectable, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Workshop } from '../models/workshop.model';

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  private collection: any;
  public workshopList = signal<Workshop[]>([]);

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, 'workshops');
  }

  async loadWorkshopList(): Promise<void> {
    collectionData(this.collection, { idField: 'id' }).subscribe((data: any[]) => {
      const workshops = data.map(item => Workshop.fromFirestore(item, item.id));
      this.workshopList.set(workshops);
    });
  }

  async createWorkshop(workshop: Workshop): Promise<void> {
    const id = doc(collection(this.firestore, 'workshops')).id;
    workshop.id = id;
    await setDoc(doc(this.firestore, `workshops/${id}`), workshop.toFirestore());
  }

  async updateWorkshop(workshop: Workshop): Promise<void> {
    await setDoc(doc(this.firestore, `workshops/${workshop.id}`), workshop.toFirestore(), { merge: true });
  }

  async deleteWorkshop(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `workshops/${id}`));
  }
}