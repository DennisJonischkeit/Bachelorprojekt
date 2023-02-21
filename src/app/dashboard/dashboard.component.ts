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
  avediskread_writechartOption: EChartsOption = {};
  avecpufreqchartOption: EChartsOption = {};

  constructor(private JobDataService: JobDataService) {
    
  }

  ngOnInit(): void {

    //headers of the incomming Json object that shloud be displayed (must be adjusted if inpout changes)
    const headers = ['user', 'jobname', 'jobid', "job_id", 'ntasks', 'allocnodes','avecpu', 'mincpu', 'mincpunode', 'mincputask', 'avecpufreq', 'avediskread', 'avediskwrite', 'maxdiskread', 'maxdiskreadnode', 'maxdiskreadtask', 'maxdiskwrite', 'maxdiskwritenode', 'maxdiskwritetask', 'avevmsize', 'maxvmsize', 'maxvmsizenode', 'maxvmsizetask', 'consumedenergy', 'avepages', 'maxpages']


   // displays a list of json objects of the incomming jobs
   this.JobDataService.jobData.subscribe((jobData: JSON[]) => {

      let currentjobdata = jobData[jobData.length - 1];
      let cardData = [];

      for (const header of headers){
        let content = this.JobDataService.getValue(header, currentjobdata);
        cardData.push({header, content});
      }
      
      this.cardData = cardData;
      console.log(jobData);


      // option beginning avediskread_writechartOption
      this.avediskread_writechartOption = {
        
        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
        },

        legend:{
          data:["avediskread", "avediskwrite"]
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },

        // data zoom with range slider
        dataZoom: [
          {type: "slider"},
          {type: "inside"}
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          name: "Bytes",
        },
        series: [
          {
            name: "avediskwrite",
            data: this.JobDataService.getListOf("avediskwrite", jobData),
            type: "line",
            color: "",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus:"series"
            },
            smooth: true
          } as SeriesOption,

          {
            name: "avediskread",
            data: this.JobDataService.getListOf("avediskread",jobData),
            type: 'line',
            color: "",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            smooth: true
          } as SeriesOption,

        ],
      };


      // option beginning of avecpufreq
      this.avecpufreqchartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
        },

        legend:{
          data:["avecpufreq"]
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },

        // data zoom with range slider
        dataZoom: [
          {type: "slider"},
          {type: "inside"}
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          name: "kHz",
        },
        series: [
          {
            name: "avecpufreq",
            data: this.JobDataService.getListOf("avecpufreq", jobData),
            type: "line",
            color: "",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus:"series"
            },
            smooth: true
          } as SeriesOption,

        ],
      };




    });

}
}


   