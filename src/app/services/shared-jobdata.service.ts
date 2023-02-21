import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class JobDataService {

// Service for JSON Objects which represent a job
private jobDataSubject = new BehaviorSubject<JSON[]>([]);
jobData = this.jobDataSubject.asObservable();

addjobData(job: JSON): void {
    this.jobDataSubject.next([...this.jobDataSubject.value, job]);
}

getValue(key: string, job: JSON){
    return (job as {[key: string]: any})[key];
}

getListOf(key: string, jobdata: any[]): any[] {
    const result: any[] = [];
  
    for (const job of jobdata) {
      if (job[key]) {
        result.push(job[key]);
      }
    }
  
    return result;
  }

  getlength(): number {
    return this.jobDataSubject.value.length;
  }
  
}