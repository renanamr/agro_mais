import { Injectable, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Visit } from '../models/visit.model';

@Injectable({ providedIn: 'root' })
export class VisitService {
  private collection: any;
  public visitList = signal<Visit[]>([]);

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, 'visits');
  }

  async loadVisitList(): Promise<void> {
    collectionData(this.collection, { idField: 'id' }).subscribe((data: any[]) => {
      const visits = data.map(item => Visit.fromFirestore(item, item.id));
      this.visitList.set(visits);
    });
  }

  async createVisit(visit: Visit): Promise<void> {
    const id = doc(collection(this.firestore, 'visits')).id;
    visit.id = id;
    await setDoc(doc(this.firestore, `visits/${id}`), visit.toFirestore());
  }

  async updateVisit(visit: Visit): Promise<void> {
    await setDoc(doc(this.firestore, `visits/${visit.id}`), visit.toFirestore(), { merge: true });
  }

  async deleteVisit(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `visits/${id}`));
  }
}