import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttTopicService {
  private topicSource = new BehaviorSubject<string>("");
  selectedtopic$ = this.topicSource.asObservable();

  setTopic(selectedtopic: string) {
    this.topicSource.next(selectedtopic);
    console.log("Topic changed to: ",selectedtopic);
  }
}
