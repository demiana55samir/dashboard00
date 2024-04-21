import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IAdmins } from '../models/iAdmins';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private firestore: AngularFirestore) {}

  getAdmins(): Observable<any[]> {
    return this.firestore
      .collection('admins')
      .valueChanges({ idField: 'adminId' });
  }

  getAdmin(adminId: string): Observable<any> {
    return this.firestore.collection('/admins').doc(adminId).valueChanges();
  }

  // getAllAdmins() {
  //   return this.firestore.collection('/admins').snapshotChanges();
  // }
  getAllAdmins(): Observable<IAdmins[]> {
    return this.firestore.collection<IAdmins>('/admins').valueChanges();
  }
  addAdmin(admin: IAdmins) {
    admin.adminId  = this.firestore.createId();
    return this.firestore.collection('/admins').doc(admin.adminId).set(admin);
  }
  async updateAdmin(adminId: string, admin: any): Promise<void> {
    return this.firestore
      .collection(`/admins`)
      .doc(adminId)
      .update(admin);
  }

  async deleteAdmin(adminId: string) {
    await this.firestore.collection('/admins').doc(adminId).delete();
  }
}
