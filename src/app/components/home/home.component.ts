import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { AddproductComponent } from '../product/addproduct.component';
import { OrdersComponent } from '../orders/orders.component';
import { Iord } from '../../models/iOrders';
import { OrdersService } from '../../services/ordersData';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Iproduct } from '../../models/iproducts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChartModule, AddproductComponent , OrdersComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
 
lineChart = new Chart({
  accessibility: {
    enabled: false,
  },
  chart: {
    type: 'line',
  },
  title: {
    text: 'Sales For The Year',
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yAxis: {},
  credits: {
    enabled: true,
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false,
      },
      enableMouseTracking: true,
    },
  },
  series: [
    {
      name: 'This Year',
      data: [
        10500, 50700, 40900, 15400, 35450, 10920, 18750, 21540, 20780, 78052,
        48200, 49213,
      ],
    } as any,
    {
      name: 'Last Year',
      data: [
        7400, 26300, 33450, 10630, 17120, 6800, 7500, 14230, 15036, 50780,
        30860, 25406,
      ],
    },
  ],
});

  pieChart1 = new Chart({
    chart: {
      type: 'pie',
    },
    title:{
      text: ''
    
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'Pending',
            y: 25.03,
          },
          {
            name: 'Canceled',
            y: 34.2,
          },
          {
            name: 'Delivered',
            y: 45,
          },
        ],
      } as any,
    ],
  });
  pieChart = new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Products',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        data: [
          { name: 'Iphone 15', y: 1, color: '#eeeeee' },

          { name: 'samsung', y: 2, color: '#393e46' },

          { name: 'labtop', y: 3, color: '#00adb5' },
          { name: 'clothes', y: 4, color: '#eeeeee' },
          { name: 'shoes', y: 5, color: '#506ef9' },
        ],
      },
    ],
  });

  
ord : Iord []=[];

orddObj:Iord= {
  orderDetailsid:'',
      orderId:'',
    confirmed:false,
    items: {
     product: [],
   },
   paymentMethod:'',
   status:'',
   timestamp:'',
};

  constructor(private router: Router, private data: OrdersService , private dataa: DataService) {
    this.getAllOrders();
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllProducts();
  }

  getAllOrders(): void {
    this.data.getAllOrders().subscribe(
      (ord :any) => {
        this.ord = ord as Iord[];
      },
      (error:any) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  resetForm() { 
    this.productObj = {
      id: '',
      ar: {
        brand: '',
        description: '',
        title: '',
      },
      categoryId: '',
      discountPercentage: 0,
      en: {
        brand: '',
        description: '',
        title: '',
      },
      images: [],
      proId: '',
      price: 0,
      quantityInStock: '',
      rating: {
        '': { 
          ReviewTitle: '',
          ReviewTitleDetail: '',
          date: '',
          name: '',
          rate: '',
        },
      },
      ratingQuantity: 0,
      sku: '',
      subCategoryId: '',
      thumbnail: '',
    };
  this.orddObj={
    orderDetailsid: '',
      orderId:'',
      confirmed:false,
      items: {
       product: [],
     },
     paymentMethod:'',
     status:'',
     timestamp:'',
  }}


  products: Iproduct[] = [];

  productObj: Iproduct = {
    id: '',
    ar: {
      brand: '',
      description: '',
      title: '',
    },
    categoryId: '',
    discountPercentage: 0,
    en: {
      brand: '',
      description: '',
      title: '',
    },
    images: [],
    proId: '',
    price: 0,
    quantityInStock: '',
    rating: {
      '': { 
        ReviewTitle: '',
        ReviewTitleDetail: '',
        date: '',
        name: '',
        rate: '',
      },
    },
    ratingQuantity: 0,
    sku: '',
    subCategoryId: '',
    thumbnail: '',
  };



  

  

  getAllProducts(): void {
    this.dataa.getAllProducts().subscribe(
      (products) => {
        this.products = products as Iproduct[];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  

}
