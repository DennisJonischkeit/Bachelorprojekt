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

  selectedTab = "avecpufreq";
  selectedJobId: string;

  

  cardData: {header: string, content: string}[] = []
  

  //init avecpufreq Option
  merge_avecpufreqchartOption ={}
  avecpufreqchartOption: EChartsOption = {

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
      boundaryGap: false
    },
    


    yAxis: {
      type: 'value',
      name: "kHz",
    },
    series: [
      {
        name: "avecpufreq",
        data: [],
        type: "line",
        color: "",
        areaStyle: {},
        emphasis: {
          focus:"series"
        },
        smooth: true
      } as SeriesOption,

    ],
    
  };;



  //init cpu Option
  merge_cpuchartOption = {};
  cpuchartOption: EChartsOption = {

    tooltip:{
      trigger: "axis",
      axisPointer:{
        type: "cross",
      },

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
        labelFormatter: "{value} seconds",
      }
    ],

    xAxis: {
      type: 'category',
      boundaryGap: false
    },

    yAxis: {
      type: 'value',
      name: "cpu time in seconds",
    },

    series: [
      {
        name: "avecpu",
        data: [],
        type: "line",
        color: "rgb(30,144,255)",
        smooth: true
      } as SeriesOption,

      {
        name: "mincpu",
        data: [],
        type: 'line',
        color: "rgb(16,78,139)",
        smooth: true
      } as SeriesOption

    ]


  };

  // init disk-read/write Option

  merge_diskread_writechartOption = {};
  diskread_writechartOption: EChartsOption = {
        
    tooltip:{
      trigger: "axis",
      axisPointer:{
        type: "cross",
      },
      order: "valueDesc",
    },

    legend:{
      data:["maxdiskread", "avediskread", "maxdiskwrite","avediskwrite"]
    },

    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {},
        restore: {}
        
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
        labelFormatter: "{value} bytes",
      }

    ],

    xAxis: [{
      type: 'category',
      boundaryGap: false
    }]
  ,
    yAxis: {
      type: 'value',
      name: "bytes",
    },
    series: [
      {
        name: "avediskwrite",
        data: [],
        type: "line",
        color:"rgb(0,255,0)",
        smooth: true
      } as SeriesOption,

      {
        name: "avediskread",
        data: [],
        type: 'line',
        color:"rgb(255,0,255)",
        smooth: true
      } as SeriesOption,

      {
        name: "maxdiskwrite",
        data: [],
        type: 'line',
        color:"rgb(0,100,0)",
        smooth: true
      } as SeriesOption,

      {
        name: "maxdiskread",
        data: [],
        type: 'line',
        color:"rgb(139,0,139)",
        smooth: true
      } as SeriesOption

    ],
  };;



// init vmsize chart

merge_vmsizechartOption = {};
vmsizechartOption: EChartsOption = {

  tooltip:{
    trigger: "axis",
    axisPointer:{
      type: "cross",
    },
    order: "valueDesc",
  },

  legend:{
    data:["maxvmsize","avevmsize"]
  },

  toolbox: {
    feature: {
      dataView: {},
      saveAsImage: {},
      restore: {}
      
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
      labelFormatter: "{value} bytes",
    }
  ],

  xAxis: {
    type: 'category',
    boundaryGap: false
  },

  yAxis: {
    type: 'value',
    name: "bytes",
  },

  series: [
    {
      name: "maxvmsize",
      data: [],
      type: "bar",
      color: "rgb(255,140,0)",
      smooth: true
    } as SeriesOption,

    {
      name: "avevmsize",
      data: [],
      type: 'bar',
      color: "rgb(255,215,0)",
      smooth: true
    } as SeriesOption

  ]


};


// init page faults chart

merge_pageschartOption = {};
pageschartOption: EChartsOption = {

  tooltip:{
    trigger: "axis",
    axisPointer:{
      type: "cross",
    },
    order: "valueDesc",
  },

  legend:{
    data:["maxpages","avepages"]
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
    boundaryGap: false
  },

  yAxis: {
    type: 'value',
    name: "count",
  },

  series: [
    {
      name: "maxpages",
      data: [],
      type: "line",
      color: "rgb(139,69,19)",
      smooth: true
    } as SeriesOption,

    {
      name: "avepages",
      data: [],
      type: 'line',
      color: "rgb(210,105,30)",
      smooth: true
    } as SeriesOption

  ]


};

  
  



// init resident set size chart
merge_residentsetsizechartOption = {};
residentsetsizechartOption: EChartsOption = {

  tooltip:{
    trigger: "axis",
    axisPointer:{
      type: "cross",
    },
    order: "valueDesc",
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
      labelFormatter: "{value} bytes",
    }
  ],

  xAxis: {
    type: 'category',
    boundaryGap: false
  },

  yAxis: {
    type: 'value',
    name: "bytes",
  },

  series: [
    {
      name: "maxrss",
      data: [],
      type: "line",
      color: "rgb(69,139,116)",
      smooth: true
    } as SeriesOption,

    {
      name: "averss",
      data: [],
      type: 'line',
      color: "rgb(118,238,198)",
      smooth: true
    } as SeriesOption

  ]



};



// init consumed energy chart

merge_consumedenergychartOption = {};
consumedenergychartOption: EChartsOption = {

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
    boundaryGap: false
    
  },

  yAxis: {
    type: 'value',
    name: "joule",
  },

  series: [
    {
      name: "consumedenergy",
      data: [],
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



};


  
 
  
  constructor(private JobDataService: JobDataService) {
    
  }


  update_dashboard(currentjobid: string){

    let currentjobdata = this.JobDataService.getDataListOfJobID(currentjobid);
    currentjobdata = currentjobdata[currentjobdata.length-1];
    let jobData = this.JobDataService.getDataListOfJobID(currentjobid);


    let cardData = [];

    for (const header of this.JobDataService.getkeysOfObject(currentjobdata)){
      let content = this.JobDataService.getValue(header, currentjobdata);
      cardData.push({header, content});
      //this.cardData.push({"jobid": topic, "data":{}})
    }
    
    this.cardData = cardData;

    // merge data of avecpufreq chart 

    this.merge_avecpufreqchartOption = {
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
            // passende job id einfügen
            extension = "jobid: "+ currentjobid +"<br>";


            const value = '<strong>' + params[i].value + '</strong>'
            content +=  extension +"<br>" +params[i].marker + ' ' + params[i].seriesName + ' ' + value +"<br>";
          }

          return content;
        }
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
      },

      series:[
        {
          data: this.JobDataService.getListOf("avecpufreq", jobData, currentjobid),
        }as SeriesOption,
      ]
    };

    // merge data of cpu chart

    this.merge_cpuchartOption = {
      tooltip:{
        trigger: "axis",
        axisPointer:{
          type: "cross",
        },

        formatter: (params: any) => {
          
          let content = params[0].axisValueLabel + '<br>'; 

          const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);

          content += "jobid: "+ currentjobid +"<br>";
         
          
          for (let i = 0; i < sortedcontent.length; i++) {

            var extension ="";
            if(params[i].seriesName == "mincpu"){
              extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"mincpunode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"mincputask",jobData);
            }

            const value = '<strong>' + params[i].value + '</strong>'
            content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
          }

          return content;
        }



      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
      },

      series: [
        {
          name: "avecpu",
          data: this.JobDataService.getListOf("avecpu", jobData, currentjobid),
          type: "line",
          color: "rgb(30,144,255)",
          smooth: true
        } as SeriesOption,

        {
          name: "mincpu",
          data: this.JobDataService.getListOf("mincpu",jobData, currentjobid),
          type: 'line',
          color: "rgb(16,78,139)",
          smooth: true
        } as SeriesOption

      ]

    };

    // merge data of disk-read/write chart

    this.merge_diskread_writechartOption = {

      tooltip:{
        trigger: "axis",
        axisPointer:{
          type: "cross",
        },
        order: "valueDesc",

        
        formatter: (params: any) => {
          
          let content = params[0].axisValueLabel + '<br>'; 

          const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);

          content += "jobid: "+ currentjobid +"<br>";
         
          
          for (let i = 0; i < sortedcontent.length; i++) {

            var extension ="";
            if(params[i].seriesName == "maxdiskread"){
              extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxdiskreadnode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxdiskreadtask",jobData);
            }

            if(params[i].seriesName == "maxdiskwrite"){
              extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxdiskwritenode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxdiskwritetask",jobData);
            }

            const value = '<strong>' + params[i].value + '</strong>'
            content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
          }

          return content;
        }
        

      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
      }],

      series: [
        {
          name: "avediskwrite",
          data: this.JobDataService.getListOf("avediskwrite", jobData, currentjobid),
          type: "line",
          color:"rgb(0,255,0)",
          smooth: true
        } as SeriesOption,

        {
          name: "avediskread",
          data: this.JobDataService.getListOf("avediskread",jobData, currentjobid),
          type: 'line',
          color:"rgb(255,0,255)",
          smooth: true
        } as SeriesOption,

        {
          name: "maxdiskwrite",
          data: this.JobDataService.getListOf("maxdiskwrite",jobData, currentjobid),
          type: 'line',
          color:"rgb(0,100,0)",
          smooth: true
        } as SeriesOption,

        {
          name: "maxdiskread",
          data: this.JobDataService.getListOf("maxdiskread",jobData, currentjobid),
          type: 'line',
          color:"rgb(139,0,139)",
          smooth: true
        } as SeriesOption

      ]

    };


    // merge data of vmsize chart

    this.merge_vmsizechartOption = {

      tooltip:{
        trigger: "axis",
        axisPointer:{
          type: "cross",
        },
        order: "valueDesc",

        formatter: (params: any) => {
          
          let content = params[0].axisValueLabel + '<br>'; 

          const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);

          content += "jobid: "+ currentjobid +"<br>";
         
          
          for (let i = 0; i < sortedcontent.length; i++) {

            var extension ="";
            if(params[i].seriesName == "maxvmsize"){
              extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxvmsizenode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxvmsizetask",jobData);
            }

            const value = '<strong>' + params[i].value + '</strong>'
            content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
          }

          return content;
        }
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
      },

      series: [
        {
          name: "maxvmsize",
          data: this.JobDataService.getListOf("maxvmsize", jobData, currentjobid),
          type: "bar",
          color: "rgb(255,140,0)",
          smooth: true
        } as SeriesOption,

        {
          name: "avevmsize",
          data: this.JobDataService.getListOf("avevmsize",jobData, currentjobid),
          type: 'bar',
          color: "rgb(255,215,0)",
          smooth: true
        } as SeriesOption

      ]


    };


    // merge data of page faults chart

    this.merge_pageschartOption = {

      tooltip:{
        trigger: "axis",
        axisPointer:{
          type: "cross",
        },
        order: "valueDesc",

        formatter: (params: any) => {
          
          let content = params[0].axisValueLabel + '<br>'; 

          const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);

          content += "jobid: "+ currentjobid +"<br>";
         
          
          for (let i = 0; i < sortedcontent.length; i++) {

            var extension ="";
            if(params[i].seriesName == "maxpages"){
              extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxpagesnode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxpagestask",jobData);
            }

            const value = '<strong>' + params[i].value + '</strong>'
            content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
          }

          return content;
        }
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
      },

      series: [
        {
          name: "maxpages",
          data: this.JobDataService.getListOf("maxpages", jobData, currentjobid),
          type: "line",
          color: "rgb(139,69,19)",
          smooth: true
        } as SeriesOption,

        {
          name: "avepages",
          data: this.JobDataService.getListOf("avepages",jobData, currentjobid),
          type: 'line',
          color: "rgb(210,105,30)",
          smooth: true
        } as SeriesOption

      ]



    };

// merge data of resident set size chart

this.merge_residentsetsizechartOption = {

  tooltip:{
    trigger: "axis",
    axisPointer:{
      type: "cross",
    },
    order: "valueDesc",

    formatter: (params: any) => {
      
      let content = params[0].axisValueLabel + '<br>'; 

      const sortedcontent = params.sort((a: any, b: any) => b.value - a.value);

      content += "jobid: "+ currentjobid +"<br>";
     
      
      for (let i = 0; i < sortedcontent.length; i++) {

        var extension ="";
        if(params[i].seriesName == "maxrss"){
          extension = "<br>on node: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxrssnode",jobData)+"<br>task ID: "+ this.JobDataService.getValueByTimestamp(params[0].axisValueLabel,"maxrsstask",jobData);
        }

        const value = '<strong>' + params[i].value + '</strong>'
        content +=  params[i].marker + ' ' + params[i].seriesName + ' ' + value + extension +"<br>";
      }

      return content;
    }
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
  },

  series: [
    {
      name: "maxrss",
      data: this.JobDataService.getListOf("maxrss", jobData, currentjobid),
      type: "line",
      color: "rgb(69,139,116)",
      smooth: true
    } as SeriesOption,

    {
      name: "averss",
      data: this.JobDataService.getListOf("averss",jobData, currentjobid),
      type: 'line',
      color: "rgb(118,238,198)",
      smooth: true
    } as SeriesOption

  ]



};
     

// merge data of consumed energy chart

this.merge_consumedenergychartOption = {

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
        // passende job id einfügen
        extension = "jobid: "+ currentjobid;


        const value = '<strong>' + params[i].value + '</strong>'
        content +=  extension +"<br>" +params[i].marker + ' ' + params[i].seriesName + ' ' + value +"<br>";
      }

      return content;
    }

  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: this.JobDataService.getListOf("timestamp", jobData, currentjobid),
  },

  series: [
    {
      name: "consumedenergy",
      data: this.JobDataService.getListOf("consumedenergy", jobData, currentjobid),
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



};

  }





  ngOnInit(): void {


  

    this.JobDataService.selectedJob.subscribe(jobid =>{

      this.selectedJobId = jobid;
      let currentjobid = this.selectedJobId;

      this.update_dashboard(currentjobid);


    });

    

   this.JobDataService.jobData.subscribe((jobData: JSON[]) => {

    let currentjobdata = jobData[jobData.length - 1];
    let currentjobid = this.JobDataService.getValue("jobid", currentjobdata);


    if(this.JobDataService.selectedJobSubject.value == ""){
      this.update_dashboard(currentjobid);
    }
    
    
    if (this.selectedJobId == currentjobid){


      this.update_dashboard(currentjobid);

    }

    });



}
}


 