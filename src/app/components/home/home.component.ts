import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { AddproductComponent } from '../addproduct/addproduct.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink,ChartModule ,AddproductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

 lineChart=new Chart({
  chart: {
    type: 'line'
  },
  title: {
    text: 'Products'
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: "products",
      data: [7,5,2, 3,6,8,10,15]
    } as any
  ]
 })
 pieChart=new Chart({
  chart: {
    type: 'pie',
    plotShadow:false
  },
  title: {
    verticalAlign:"middle",
    floating:true,
    text:"Products"
  },
  credits: {
    enabled: false
  },
  plotOptions:{
    pie:{
      innerSize :"99%",
      borderWidth:10,
      borderColor:"",
      slicedOffset:10,
      dataLabels:{
        connectorWidth:0
      }
    }
  },
  legend:{
    enabled:false
  },
  series:[
    {
      type:"pie",
      data:[
        {name:"Iphone 15" ,y :1 , color:"#eeeeee"},

        {name:"samsung" ,y :2 , color:"#393e46"},

        {name:"labtop" ,y :3 , color:"#00adb5"},
        {name:"clothes" ,y :4 , color:"#eeeeee"},
        {name:"shoes" ,y :5 , color:"#506ef9"},
      ]
    }
  ]
 })
}


