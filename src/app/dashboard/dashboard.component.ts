import { Component, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import { JobDataService } from '../services/shared-jobdata.service';
import { SeriesOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private JobDataService: JobDataService) {
    
  }

  ngOnInit(): void {

   // displays a list of json objects of the incomming jobs
   this.JobDataService.jobData.subscribe((jobData: JSON[]) => {

      console.log(jobData);
   });


  }
}