import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/ordersData';
import { Iord } from '../../models/iOrders';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-orders',
  imports: [CommonModule , FormsModule],
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnInit {

  orddObj: Iord = {
    orderDetailsid: '',
    orderId: '',
    confirmed: false,
    items: {
      product: [],
    },
    paymentMethod: '',
    status: '',
    timestamp: '',
  };

  params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: OrdersService
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.getOrder(this.params.orderDetailsid, this.params.orderId);
  }

  getOrder(orderDetailsid: string, orderId: string): void {
    this.data.getOrder(orderDetailsid, orderId).subscribe(
      (ord: Iord) => {
        this.orddObj = ord;
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }

  updateOrder(): void {
    this.data.updateOrder(this.orddObj.orderDetailsid,this.orddObj.orderId, this.orddObj).then(() => {
      console.log('Order updated successfully');
      this.router.navigate(['/orders']);
    })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
  }
}
