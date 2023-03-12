import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MqttTopicService } from './mqtt-topic.service';


@Injectable({
providedIn: 'root'
})
export class JobDataService {

  jobs: any[]= [];
  current_selectedJobId = "";
  
  last_topic = "";
  topic_change = false;
  item_count = 0;
 
  
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

  // init last topic
  if(this.item_count == 0){
    this.last_topic = item_topic;
  }

  // detect topic change
  if(!(this.last_topic == item_topic)){

    console.log("topic changed detected");
    this.topic_change = true;
    
  }else{
    this.topic_change = false;
  }




  

  let jobid = this.getValue("jobid", job);
  


  // case of topic_change false 

  if(!(this.topic_change)){

    // case of job not in datastructre yet
    if (!(this.jobIdsSubject.value.includes(this.getValue("jobid", job)))){

      this.jobIdsSubject.next([...this.jobIdsSubject.value, this.getValue("jobid", job)]);
      this.jobs.push([jobid,[job],item_topic]);

    // case of job in datastructrue
    }else{

      for(let i=0; i<this.jobs.length; i++){
        if(this.jobs[i][0] == jobid){
          this.jobs[i][1].push(job);
        }
      }
      
    }

  // case of topic_change true (
  }else{

    // anpassung der job id liste für die sidebar

    // gehe durch die datenstruktur und schaue ob es einträge gibt,
    // die noch zum neuen topic dazugehören ansonsten resette die id liste

    if(!(this.isSubsetOrSuperset(this.last_topic, item_topic))){

      this.jobIdsSubject.next([jobid]);
      this.jobs.push([jobid, [job], item_topic]);

    
    }else{


      // !!! bugs fixen set erkennung und prozedur laufen noch nicht korrekt
      let newlist = [];
      for(let i=0; i<this.jobs.length; i++){

        if(this.isSubsetOrSuperset(this.jobs[i][2],item_topic)){

          

          if(this.isSuperset(this.jobs[i][2],item_topic)){

            console.log("superset");

            newlist.push(jobid);
            this.jobs[i][1].push(job);
            

          }



          if(this.isSubset(this.jobs[i][2],item_topic)){

            console.log("subset");

            newlist.push(jobid);
            this.jobs[i][1].push(job);
            break;

          }
        }
      }

      




    }









  }



  
  this.jobDataSubject.next([...this.jobDataSubject.value, job]);
  this.item_count += 1 ;
  this.last_topic = item_topic;

}

getValue(key: string, job: JSON){
  const result = (job as {[key: string]: any});
  if (result[key]){
    return result[key];
  }
}



getJobIdByTimestamp(timestamp: string, jobdata: any[]): any{

for (const job of jobdata){

  if (job["timestamp"] == timestamp){
    return job["jobid"];
  }

}

}


getValueByTimestamp(timestamp: string, key: string, jobdata: any[]): any{

for (const job of jobdata){
  if(job["timestamp"] == timestamp){
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
  const timestamp = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}Z`;
  return {...obj, timestamp};
}

getDataListOfJobID(jobid: string) {
  for(let i=0; i<this.jobs.length; i++){
    if(this.jobs[i][0] == jobid){
      return this.jobs[i][1];
    }
  }

}


isSubsetOrSuperset(last:string, current:string){

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

return true;

}

isSubset(last:string, current:string){
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
  return true;

}

isSuperset(last:string, current:string){

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
  return true;

}








}

