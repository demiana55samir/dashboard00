// import { Iord } from './iOrders';
import { Iproduct } from './iproducts';

// export interface Iorder {
//   orderDetailsid: string;
//   confirmed: boolean;
//   deliveryMethod: string;
//   shippingAddress: {
//     additionalInfo: string;
//     address: string;
//     city: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     region: string;
//   };
//   userId: string;
//   orders: {
//     orderId: string;
//     confirmed: boolean;
//     items: {
//       product: Iproduct[];
//     };
//     paymentMethod: string;
//     status: string;
//     timestamp: string;
//   };
// }

export interface Iord {
  orderDetailsid: string;
  orderId: string;
  confirmed: boolean;
  items: {
    product: Iproduct[];
   
  };
  paymentMethod: string;
  status: string;
  timestamp: string;
}
