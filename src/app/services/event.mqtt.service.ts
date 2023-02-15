import { Injectable} from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";
import { MqttTopicService } from './mqtt-topic.service';

@Injectable()
export class EventMqttService {

  private endpoint: string;
  private endpoint_static: string;
  private selectedtopic: string;
  
  constructor(
    private _mqttService: MqttService,
    private MqttTopicService: MqttTopicService,
  ) {
    this.endpoint = 'events';
    this.endpoint_static = "cesari/home/djonisch/1";

    this.MqttTopicService.selectedtopic$.subscribe(selectedtopic => {
      this.selectedtopic=selectedtopic;
      console.log(this.selectedtopic);
    })
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint_static}`;  
    console.log(topicName);   
    return this._mqttService.observe(topicName);
  }
}