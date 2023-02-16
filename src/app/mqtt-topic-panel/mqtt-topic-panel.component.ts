import { Component, OnInit} from '@angular/core';
import { MqttTopicService } from '../services/mqtt-topic.service';

@Component({
  selector: 'app-mqtt-topic-panel',
  templateUrl: './mqtt-topic-panel.component.html',
  styleUrls: ['./mqtt-topic-panel.component.scss']
})
export class MqttTopicPanelComponent implements OnInit {
  
  topic: string="";

  constructor(private mqttTopicService: MqttTopicService){}
    
    updateTopic(){
      this.mqttTopicService.setTopic(this.topic);
    }

    ngOnInit(){
      this.updateTopic()
    }
  }

