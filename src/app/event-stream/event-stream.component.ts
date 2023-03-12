import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EventMqttService } from '../services/event.mqtt.service'
import { IMqttMessage } from "ngx-mqtt";
import {WebserviceService} from '../services/webservice.service';
import { JobDataService } from '../services/shared-jobdata.service';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { MqttTopicService } from '../services/mqtt-topic.service';


@Component({
    selector: 'event-stream',
    templateUrl: './event-stream.component.html',
    styleUrls: ['./event-stream.component.scss'],
})
export class EventStreamComponent {


    events: any[];
    private deviceId: string;
    subscription: Subscription;
    private selectedtopic: string;


    constructor(
        private readonly eventMqtt: EventMqttService,
        private ws: WebserviceService,
        private JobDataService: JobDataService,
        private mqttTopicService: MqttTopicService,
    ){

    }

    startstream() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.eventMqtt.endpoint_static = this.mqttTopicService.topic;
        this.subscribeToTopic();
    }

    endstream(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    private subscribeToTopic() {

        
        this.subscription = this.eventMqtt.topic()
            .subscribe((data: IMqttMessage) => {
                let item = JSON.parse(new TextDecoder("utf-8").decode(data.payload)); //json object with job information
                
                // timestemp in Object reinlegen
                const newitem = this.JobDataService.addTimeStamp(item);

                let item_topic = this.eventMqtt.endpoint_static;
                
                this.JobDataService.addjobData(newitem, item_topic);
                //console.log("Es kommen daten an...", newitem);
                
                
                
                
              
                // item hier an Datenbank schicken / text Datei 
                
            });
    
}

}
