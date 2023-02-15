import { Component, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import { SpeedService } from '../services/speed.service';
import { SeriesOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  carspeedchartOption: EChartsOption = {};

  constructor(private speedService: SpeedService) {
    
  }

  ngOnInit(): void {
    this.speedService.speedValues.subscribe((speedValues: number[]) => {
      console.log(speedValues);

      this.carspeedchartOption = {
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: speedValues,
            type: 'line',
            smooth: true
          } as SeriesOption,
        ],
      };
    });

   // displays a list of json objects of the incomming jobs
   this.speedService.jobData.subscribe((jobData: JSON[]) => {

      console.log(jobData);
   });


  }
}