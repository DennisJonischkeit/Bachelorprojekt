import { Component, OnInit} from '@angular/core';
//import { EventDataModel } from 'app/models/event.model';
import { Subscription } from 'rxjs';
import { EventMqttService } from '../services/event.mqtt.service'
import { IMqttMessage } from "ngx-mqtt";
import {WebserviceService} from '../services/webservice.service';
import { SpeedService } from '../services/speed.service';
import { _isTestEnvironment } from '@angular/cdk/platform';

@Component({
    selector: 'event-stream',
    templateUrl: './event-stream.component.html',
    styleUrls: ['./event-stream.component.scss'],
})
export class EventStreamComponent implements OnInit {
    
    events: any[];
    private deviceId: string;
    subscription: Subscription;


    constructor(
        private readonly eventMqtt: EventMqttService,
        private ws: WebserviceService,
        private speedService: SpeedService,
    ){
    }

    ngOnInit() {
        this.subscribeToTopic();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    private subscribeToTopic() {
        this.subscription = this.eventMqtt.topic(this.deviceId)
            .subscribe((data: IMqttMessage) => {
                let item = JSON.parse(new TextDecoder("utf-8").decode(data.payload)); //json object with job information
                console.log(item["speed"]);
                //this.ws.jobs.push(item);
                //this.events.push(item);
                
                this.speedService.addSpeedValue(+item['speed']);

                this.speedService.addjobData(item);
                
            });
    }

}

