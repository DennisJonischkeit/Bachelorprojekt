import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MqttTopicService } from './mqtt-topic.service';


@Injectable({
providedIn: 'root'
})
export class JobDataService {

  jobs: any[]= [];
  current_selectedJobId = "";
  
  
// Service for JSON Objects which represent a job
private jobDataSubject = new BehaviorSubject<JSON[]>([]);
jobData = this.jobDataSubject.asObservable();


// list of current job ids 
jobIdsSubject = new BehaviorSubject<string[]>([]);
jobIdData = this.jobIdsSubject.asObservable();

// current selected jobid
selectedJobSubject = new BehaviorSubject<string>('');
selectedJob = this.selectedJobSubject.asObservable();



constructor(private topic: MqttTopicService){}


addjobData(job: JSON, item_topic: string): void {

  
  let jobid = this.getValue("jobid", job);
  let user = this.getUserFromTopic(item_topic);


  // case not in datastructure yet
  if(!(this.inDatastructure(jobid, user))){

    this.jobs.push([jobid, [job], item_topic, user]);
    this.jobIdsSubject.next([...this.jobIdsSubject.value, jobid]);


  // case in datastructure
  }else{

    if(!(this.jobIdsSubject.value.includes(jobid))){
      this.jobIdsSubject.next([...this.jobIdsSubject.value, jobid]);
    }

    for(let i=0; i<this.jobs.length; i++){
      if((this.jobs[i][0] == jobid) && (this.jobs[i][3] == user)){
        this.jobs[i][1].push(job);
      }
    }

  }

  this.jobDataSubject.next([...this.jobDataSubject.value, job]);

}









getValue(key: string, job: JSON){
  const result = (job as {[key: string]: any});
  if (result[key]){
    return result[key];
  }
}



getValueByTimestamp(timestamp: string, key: string, jobdata: any[], jobid:string): any{

for (const job of jobdata){
  if((job["timestamp"] == timestamp) && (job["jobid"] == jobid)){
    return job[key];
  }

}


}



getListOf(key: string, jobdata: any[], currentjobid:string): any[] {
    const result: any[] = [];
  
    for (const job of jobdata) {

      if(!(job["jobid"]==currentjobid)){
        continue;
      }

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


addTimeStamp(obj: any): any {
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.000Z`;
  return {...obj, timestamp};
}




getDataListOfJobID(jobid: string) {
  for(let i=0; i<this.jobs.length; i++){
    if(this.jobs[i][0] == jobid){
      return this.jobs[i][1];
    }
  }

}


isOnlySubsetOrSuperset(last:string, current:string){

  // example topic strings: 
  //  last:    cesari/home/djonisch/92924
  //  current: cesari/home/djonisch/#

  let last_topic: string[] = last.split("/");
  let current_topic: string[] = current.split("/");

  for (let i=0; i<current_topic.length; i++){

    if(!(current_topic[i] == last_topic[i])){

      if((current_topic[i] == "#") || (last_topic[i] == "#")){

        return true;

      }
      return false;
    }
  }

return false;

}

isOnlySubset(last:string, current:string){
  let last_topic: string[] = last.split("/");
  let current_topic: string[] = current.split("/");

  for (let i=0; i<current_topic.length; i++){

    if(!(current_topic[i] == last_topic[i])){

      if((last_topic[i] == "#")){

        return true;

      }
      return false;
    }
  }
  return false;

}

isOnlySuperset(last:string, current:string){

  let last_topic: string[] = last.split("/");
  let current_topic: string[] = current.split("/");

  for (let i=0; i<current_topic.length; i++){

    if(!(current_topic[i] == last_topic[i])){

      if((current_topic[i] == "#")){

        return true;

      }
      return false;
    }
  }
  return false;

}



inDatastructure(jobid: string, user:string){

  for(let i=0; i<this.jobs.length; i++){

    if((this.jobs[i][0] == jobid) && (this.jobs[i][3] == user)){
      return true;

    }
  }
  return false;
}


getUserFromTopic(topic: string){

  let newTopic = topic.split("/");
  return newTopic[newTopic.length - 2];


}

mergeLists(timelist: string[], datalist: string[]){

  var newlist = [];

  for(let i=0;i<timelist.length;i++ ){
    newlist.push([timelist[i], datalist[i]]);
  }

  return newlist;

}




}

