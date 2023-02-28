import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class JobDataService {
  
// Service for JSON Objects which represent a job
private jobDataSubject = new BehaviorSubject<JSON[]>([]);
jobData = this.jobDataSubject.asObservable();


// list of current job ids
private jobIdsSubject = new BehaviorSubject<string[]>([]);
jobIdData = this.jobIdsSubject.asObservable();


addjobData(job: JSON): void {
    
  this.jobDataSubject.next([...this.jobDataSubject.value, job]);
  
  if (!(this.jobIdsSubject.value.includes(this.getValue("jobid", job)))){
    this.jobIdsSubject.next([...this.jobIdsSubject.value, this.getValue("jobid", job)]);
    console.log(this.getValue("jobid", job));
  }

}

getValue(key: string, job: JSON){
  const result = (job as {[key: string]: any});
  if (result[key]){
    return result[key];
  }
}

getListOf(key: string, jobdata: any[]): any[] {
    const result: any[] = [];
  
    for (const job of jobdata) {

      if (key == "avecpufreq"){
        result.push(job[key].slice(0, job[key].length - 1));
        continue;
      }

      if((key=="mincpu" || key == "avecpu")){
        result.push(this.timeToSeconds(job[key]));
        continue;
      }


      if (job[key]) {
        result.push(job[key]);
      }
    }
  
    return result;
  }

getkeysOfObject(obj: {[key:string]: any}): string[]{
  return Object.keys(obj)
}

timeToSeconds(time: string): number {
  const regex = /^(\d{2}):(\d{2})\.(\d{3})$/;
  const match = regex.exec(time);
  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }
  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  const milliseconds = parseInt(match[3], 10);
  return minutes * 60 + seconds + milliseconds / 1000;
}



addTimeStamp(obj: any): any{
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  return {...obj, timestamp};
}




}

