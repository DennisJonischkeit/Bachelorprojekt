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
  diskread_writechartOption: EChartsOption = {};
  avecpufreqchartOption: EChartsOption = {};
  vmsizechartOption: EChartsOption = {};
  pageschartOption: EChartsOption = {};
  residentsetsizechartOption: EChartsOption = {};
  consumedenergychartOption: EChartsOption = {};
  cpuchartOption: EChartsOption = {};



  constructor(private JobDataService: JobDataService) {
    
  }

  ngOnInit(): void {

   // prepares the cardData of the incomming jobdata
   this.JobDataService.jobData.subscribe((jobData: JSON[]) => {

      let currentjobdata = jobData[jobData.length - 1];
      let cardData = [];

      for (const header of this.JobDataService.getkeysOfObject(currentjobdata)){
        let content = this.JobDataService.getValue(header, currentjobdata);
        cardData.push({header, content});
      }
      
      this.cardData = cardData;

      // option beginning avediskread_writechartOption
      this.diskread_writechartOption = {
        
        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
          order: "valueDesc",

          
          formatter: (params: any) => {
            
            let content = params[0].axisValueLabel + '<br>'; 

            const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);
           
            
            for (let i = 0; i < sortedcontent.length; i++) {

              var extension ="";
              if(params[i].seriesName == "maxdiskread"){
                extension = "<br>on node: "+ this.JobDataService.getValue("maxdiskreadnode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("maxdiskreadtask",currentjobdata);
              }

              if(params[i].seriesName == "maxdiskwrite"){
                extension = "<br>on node: "+ this.JobDataService.getValue("maxdiskwritenode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("maxdiskwritetask",currentjobdata);
              }

              const value = '<strong>' + params[i].value + '</strong>'
              content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
            }

            return content;
          }
          

        },

        legend:{
          data:["maxdiskread", "avediskread", "maxdiskwrite","avediskwrite"]
        },

        toolbox: {
          feature: {
            dataView: {},
            restore: {},
            saveAsImage: {}
            
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "filter",
            orient: "vertical",
            labelFormatter: "{value} Bytes",
          }

        ],

        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        }]
      ,
        yAxis: {
          type: 'value',
          name: "Bytes",
        },
        series: [
          {
            name: "avediskwrite",
            data: this.JobDataService.getListOf("avediskwrite", jobData),
            type: "line",
            color:"rgb(0,255,0)",
            smooth: true
          } as SeriesOption,

          {
            name: "avediskread",
            data: this.JobDataService.getListOf("avediskread",jobData),
            type: 'line',
            color:"rgb(255,0,255)",
            smooth: true
          } as SeriesOption,

          {
            name: "maxdiskwrite",
            data: this.JobDataService.getListOf("maxdiskwrite",jobData),
            type: 'line',
            color:"rgb(0,100,0)",
            smooth: true
          } as SeriesOption,

          {
            name: "maxdiskread",
            data: this.JobDataService.getListOf("maxdiskread",jobData),
            type: 'line',
            color:"rgb(139,0,139)",
            smooth: true
          } as SeriesOption

        ],
      };



      // option beginning vmsizechartOPtion

      this.vmsizechartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
          order: "valueDesc",

          formatter: (params: any) => {
            
            let content = params[0].axisValueLabel + '<br>'; 

            const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);
           
            
            for (let i = 0; i < sortedcontent.length; i++) {

              var extension ="";
              if(params[i].seriesName == "maxvmsize"){
                extension = "<br>on node: "+ this.JobDataService.getValue("maxvmsizenode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("maxvmsizetask",currentjobdata);
              }

              const value = '<strong>' + params[i].value + '</strong>'
              content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
            }

            return content;
          }
        },

        legend:{
          data:["maxvmsize","avevmsize"]
        },

        toolbox: {
          feature: {
            dataView: {},
            restore: {},
            saveAsImage: {}
            
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "filter",
            orient: "vertical",
            labelFormatter: "{value}",
          }
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        },

        yAxis: {
          type: 'value',
          name: "Bytes",
        },

        series: [
          {
            name: "maxvmsize",
            data: this.JobDataService.getListOf("maxvmsize", jobData),
            type: "bar",
            color: "rgb(255,140,0)",
            smooth: true
          } as SeriesOption,

          {
            name: "avevmsize",
            data: this.JobDataService.getListOf("avevmsize",jobData),
            type: 'bar',
            color: "rgb(255,215,0)",
            smooth: true
          } as SeriesOption

        ]


      }

      // option beginning of cpuchartOption

      this.cpuchartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },

          formatter: (params: any) => {
            
            let content = params[0].axisValueLabel + '<br>'; 

            const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);
           
            
            for (let i = 0; i < sortedcontent.length; i++) {

              var extension ="";
              if(params[i].seriesName == "mincpu"){
                extension = "<br>on node: "+ this.JobDataService.getValue("mincpunode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("mincputask",currentjobdata);
              }

              const value = '<strong>' + params[i].value + '</strong>'
              content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
            }

            return content;
          }



        },

        legend:{
          data:["avecpu", "mincpu"]
        },

        toolbox: {
          feature: {
            dataView: {},
            saveAsImage: {},
            restore: {},
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "filter",
            orient: "vertical",
            labelFormatter: "{value}",
          }
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        },

        yAxis: {
          type: 'value',
          name: "cpu time in seconds",
        },

        series: [
          {
            name: "avecpu",
            data: this.JobDataService.getListOf("avecpu", jobData),
            type: "line",
            color: "rgb(30,144,255)",
            smooth: true
          } as SeriesOption,

          {
            name: "mincpu",
            data: this.JobDataService.getListOf("mincpu",jobData),
            type: 'line',
            color: "rgb(16,78,139)",
            smooth: true
          } as SeriesOption

        ]


      }


      // option beginning of avecpufreqchartOption
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
            dataView: {},
            saveAsImage: {},
            restore: {},
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"}
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
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
            areaStyle: {},
            emphasis: {
              focus:"series"
            },
            smooth: true
          } as SeriesOption,

        ],
      };

       

      // option beginning of pagesChart
      this.pageschartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
          order: "valueDesc",

          formatter: (params: any) => {
            
            let content = params[0].axisValueLabel + '<br>'; 

            const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);
           
            
            for (let i = 0; i < sortedcontent.length; i++) {

              var extension ="";
              if(params[i].seriesName == "maxpages"){
                extension = "<br>on node: "+ this.JobDataService.getValue("maxpagesnode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("maxpagestask",currentjobdata);
              }

              const value = '<strong>' + params[i].value + '</strong>'
              content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
            }

            return content;
          }
        },

        legend:{
          data:["maxpages","avepages"]
        },

        toolbox: {
          feature: {
            dataView: {},
            restore: {},
            saveAsImage: {}
            
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "filter",
            orient: "vertical",
            labelFormatter: "{value}",
          }
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        },

        yAxis: {
          type: 'value',
          name: "Anzahl",
        },

        series: [
          {
            name: "maxpages",
            data: this.JobDataService.getListOf("maxpages", jobData),
            type: "line",
            color: "rgb(139,69,19)",
            smooth: true
          } as SeriesOption,

          {
            name: "avepages",
            data: this.JobDataService.getListOf("avepages",jobData),
            type: 'line',
            color: "rgb(210,105,30)",
            smooth: true
          } as SeriesOption

        ]


      }


  // beginning of rss chart

      this.residentsetsizechartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },
          order: "valueDesc",

          formatter: (params: any) => {
            
            let content = params[0].axisValueLabel + '<br>'; 

            const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);
           
            
            for (let i = 0; i < sortedcontent.length; i++) {

              var extension ="";
              if(params[i].seriesName == "maxrss"){
                extension = "<br>on node: "+ this.JobDataService.getValue("maxrssnode",currentjobdata)+"<br>task ID: "+ this.JobDataService.getValue("maxrsstask",currentjobdata);
              }

              const value = '<strong>' + params[i].value + '</strong>'
              content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
            }

            return content;
          }
        },

        legend:{
          data:["maxrss","averss"]
        },

        toolbox: {
          feature: {
            dataView: {},
            restore: {},
            saveAsImage: {}
            
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "filter",
            orient: "vertical",
            labelFormatter: "{value}",
          }
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        },

        yAxis: {
          type: 'value',
          name: "Bytes",
        },

        series: [
          {
            name: "maxrss",
            data: this.JobDataService.getListOf("maxrss", jobData),
            type: "line",
            color: "rgb(69,139,116)",
            smooth: true
          } as SeriesOption,

          {
            name: "averss",
            data: this.JobDataService.getListOf("averss",jobData),
            type: 'line',
            color: "rgb(118,238,198)",
            smooth: true
          } as SeriesOption

        ]



      }

      // beginning of consumed energy chartoption

      this.consumedenergychartOption = {

        tooltip:{
          trigger: "axis",
          axisPointer:{
            type: "cross",
          },

        },

        legend:{
          data:["consumedenergy"]
        },

        toolbox: {
          feature: {
            dataView: {},
            restore: {},
            saveAsImage: {}
            
          }
        },

        dataZoom: [
          {type: "slider"},
          {type: "inside"},
        ],

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.JobDataService.getListOf("timestamp", jobData),
        },

        yAxis: {
          type: 'value',
          name: "joule",
        },

        series: [
          {
            name: "consumedenergy",
            data: this.JobDataService.getListOf("consumedenergy", jobData),
            type: "line",
            color: "rgb(255,69,0)",
            markPoint: {
              data: [

                {name: "Maximum", type: "max"},
                {type: "min"}
              ],
              
               
            },
            smooth: true
          } as SeriesOption

        ]



      }



















    });

}
}


 