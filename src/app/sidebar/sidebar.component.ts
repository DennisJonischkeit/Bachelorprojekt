import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../services/shared-jobdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private JobDataService: JobDataService){}

  ngOnInit(): void {

    this.JobDataService.jobIdData.subscribe((jobIddata: string[]) =>{

      console.log("changed");
    });
  }
}
