import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import {mergeMap,groupBy, map,reduce} from 'rxjs/operators';
import {Chart} from 'core-js'
import {ReportingService} from './reporting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularReporting1';

  chart = [];
  courses : Object = null;
  options =[
    {id: 1 , text: "On Site Courses"},
    {id: 2 , text: "Online Courses"},
    {id: 3 , text: "All Courses"}
  ]
  selection: Number = 3;

  constructor (private reporting: ReportingService){}

  random_rgba(){
    var o = Math.round , r = Math.random , s = 255;
    return 'rgba('+ o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) +',0.7)'  
  }
  submitRequest()
  {
    this.reporting.getReportingData(this.selection).subscribe(response =>{
      console.log(response);

      let keys = response["Deparments"].map(d=> d.Name);
      let values = response["Deparments"].map(d=> d.Average);

      this.courses = response['Courses'];

      this.chart = new Chart ('canvas',
      {
        type: 'bar',
        data : {
          labels: keys,
          datasets: [
            {
              data: values,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor:
              [
                this.random_rgba(),
                this.random_rgba(),
                this.random_rgba(),
                this.random_rgba()
              ]
            }
          ]
        }, options:{
          legend:{
            display: false
          },
          title: {
            display: true,
            text: "Average grade by Department",
          },
          scales: {
            xAxes: [
              {
                display: true,
                barPercentage: 0.75
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  min:0,
                  max: 100
                }
              }
            ],
          }
        }
      }
      
      )
    });

}
}
