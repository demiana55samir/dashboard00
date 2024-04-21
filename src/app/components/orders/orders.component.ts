import { Component } from '@angular/core';
import { Iord } from '../../models/iOrders';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/ordersData';
import { log } from 'console';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  ord: Iord[] = [];

  // orddObj :Iord={
  //   orderDetailsid: '',
  //   confirmed: true,
  //   deliveryMethod: '',
  //   shippingAddress: {
  //     additionalInfo: '',
  //     address: '',
  //     city:'',
  //     firstName: '',
  //     lastName: '',
  //     phone:'',
  //     region:'',
  //   },
  //   userId: '',
  //   orders: {
  //     orderId:'',
  //     confirmed:false,
  //     items: {
  //      product: [],
  //    },
  //    paymentMethod:'',
  //    status:'',
  //    timestamp:'',
  //   },
  // };

  orddObj : Iord = {
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

  constructor(private router: Router, private data: OrdersService) {
    this.getAllOrders();
    // console.log(this.getAllOrders());
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.data.getAllOrders().subscribe(
      (ord: any) => {
        this.ord = ord as Iord[];
      },
      (error: any) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  resetForm() {
    this.orddObj = {
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
  }
  addOrder() {
    this.data.addOrder(this.orddObj);
    this.resetForm();
  }

  updateOrder(order: Iord): void {
    this.orddObj = { ...order };

    this.router.navigate([
      '/editOrder',
      this.orddObj,
    ]);
  }

  deleteOrder(orderDetailsid:string ,  orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.data
        .deleteOrder( orderDetailsid , orderId)
        .then(() => {
          console.log('order deleted successfully');
          this.getAllOrders();
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    }
  }
}
