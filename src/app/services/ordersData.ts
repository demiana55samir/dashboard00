import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) {}

  getAllOrders(): Observable<any[]> {
  return this.firestore.collectionGroup('orders').valueChanges({ idField: 'orderId' }); 
  }

  getOrder(orderDetailsid :string , orderId: string): Observable<any> {
    return this.firestore.doc(`order-details/${orderDetailsid}/orders/${orderId}`).valueChanges();
  }

  addOrder(orderData: any): Promise<void> {
    const newOrderId = this.firestore.createId();
    const orderRef = this.firestore.doc(`order-details/${newOrderId}/orders/${newOrderId}`);
    return orderRef.set({ id: newOrderId, ...orderData });
  }


  updateOrder(orderDetailsid :string ,orderId: string, orderData: Partial<any>): Promise<void> {
    const orderRef = this.firestore.doc(`order-details/${orderDetailsid}/orders/${orderId}`);
    return orderRef.update(orderData);
  }

  deleteOrder(orderDetailsid :string , orderId: string): Promise<void> {
    const orderRef = this.firestore.doc(`order-details/${orderDetailsid}/orders/${orderId}`);
    return orderRef.delete();
  }
}
