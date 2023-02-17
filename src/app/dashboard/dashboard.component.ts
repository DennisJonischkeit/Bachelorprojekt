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

  cardData: {header: string, content: string}[] = []


  constructor(private JobDataService: JobDataService) {
    
  }

  ngOnInit(): void {

    const headers = ['user', 'jobname', 'jobid', 'ntasks', 'allocnodes', 'avecpu', 'mincpu', 'mincpunode', 'mincputask', 'avecpufreq', 'avediskread', 'avediskwrite', 'maxdiskread', 'maxdiskreadnode', 'maxdiskreadtask', 'maxdiskwrite', 'maxdiskwritenode', 'maxdiskwritetask', 'avevmsize', 'maxvmsize', 'maxvmsizenode', 'maxvmsizetask', 'consumedenergy', 'avepages', 'maxpages']


   // displays a list of json objects of the incomming jobs
   this.JobDataService.jobData.subscribe((jobData: JSON[]) => {

      let currentjobdata = jobData[jobData.length - 1];
      let cardData = [];

      for (const header of headers){
        let content = this.JobDataService.getValue(header, currentjobdata);
        cardData.push({header, content});
      }
      
      this.cardData = cardData;
      console.log(currentjobdata);
   });


  }
}