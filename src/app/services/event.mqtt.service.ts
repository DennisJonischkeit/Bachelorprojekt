import { Injectable} from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";


@Injectable()
export class EventMqttService {

  private endpoint: string;
  endpoint_static: string;
  

  
  constructor(
    private _mqttService: MqttService,
    

  ) {
    this.endpoint = 'events';
    this.endpoint_static = "home/tutorial/PubSubDemo111";
   

  }

  topic(): Observable<IMqttMessage> {
    let topicName = `${this.endpoint_static}`;  
    console.log("listening...: ",topicName);   
    return this._mqttService.observe(topicName);
  }
 
}