import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttTopicService {
  topic= "";

  private topicSource = new BehaviorSubject<string>("");
  selectedtopic$ = this.topicSource.asObservable();

  setTopic(selectedtopic: string) {
    this.topicSource.next(selectedtopic);
    this.topic = selectedtopic;
    
  }

  getTopic(): string{
    return this.topic;
  }

}
