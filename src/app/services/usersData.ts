import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUsers } from '../models/users';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<IUsers[]> {
    return this.firestore.collection<IUsers>('users').valueChanges({ idField: 'userID' });
  }

  getUser(userID: string) {
    return this.firestore.collection('users').doc(userID).valueChanges();
  }

  // getAllUsers() {
  //   return this.firestore.collection('/users').snapshotChanges();
  // }
  getAllUsers(): Observable<IUsers[]> {
    return this.firestore.collection<IUsers>('users').valueChanges();
  }

  addUser(user: IUsers) {
    user.userID = this.firestore.createId();
    return this.firestore.collection('users').doc(user.userID).set(user);
  }

  addAdminField(user: IUsers){
    const DocId = user.userID
    const newField ={isAdmin: true}
    const DocRef = this.firestore.collection('users').doc(DocId)
    DocRef.update(newField)
    .then(()=>{
      alert("docement Successfully updated")
    })
    .catch((error)=>{
      alert(error);
    })
  }

  addDocument(user: IUsers){
    this.firestore.collection('admins').doc(user.userID).set(user)
    .then(()=>{
      alert("document is added successfully")
    })
    .catch((error)=>{
      alert(error)
    })
  }

  async updateUser(userID: string, user: Partial<IUsers>): Promise<void> {
    return this.firestore.collection('users').doc(userID).update(user);
  }

  async deleteUser(userID: string): Promise<void> {
    return this.firestore.collection('users').doc(userID).delete();
  }
}
