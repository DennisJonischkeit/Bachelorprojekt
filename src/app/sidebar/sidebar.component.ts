import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../services/shared-jobdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarData: string[] = [];
  selectedJob = "";
  

  selectedJobRoutine(jobid: string){
    this.selectedJob = jobid;
    console.log("clicked on job: ", jobid);
    this.JobDataService.current_selectedJobId = jobid;
    this.JobDataService.selectedJobSubject.next(jobid);
  };

  constructor(private JobDataService: JobDataService){}

  ngOnInit(): void {

    this.JobDataService.jobIdData.subscribe((jobIddata: string[]) =>{

      

      let sidebarData = [];

      for(let i=0; i<jobIddata.length; i++){
        sidebarData.push(jobIddata[i]);

      }

      this.sidebarData = sidebarData;


    });
  }
}
