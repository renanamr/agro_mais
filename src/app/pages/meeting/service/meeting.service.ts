// meeting.service.ts (CORRIGIDO)
import { Injectable, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Meeting } from '../models/meeting.model';

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private collection: any; // ou ReturnType<typeof collection>
  public meetingList = signal<Meeting[]>([]);

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, 'meetings'); // ← AQUI!
  }

  async loadMeetingList(): Promise<void> {
    collectionData(this.collection, { idField: 'id' }).subscribe((data: any[]) => {
      const meetings = data.map(item => Meeting.fromFirestore(item, item.id));
      this.meetingList.set(meetings);
    });
  }

  async createMeeting(meeting: Meeting): Promise<void> {
    const id = doc(collection(this.firestore, 'meetings')).id;
    meeting.id = id;
    await setDoc(doc(this.firestore, `meetings/${id}`), meeting.toFirestore());
  }

  async updateMeeting(meeting: Meeting): Promise<void> {
    await setDoc(doc(this.firestore, `meetings/${meeting.id}`), meeting.toFirestore(), { merge: true });
  }

  async deleteMeeting(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `meetings/${id}`));
  }
}