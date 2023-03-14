import { Component} from '@angular/core';
import { MqttTopicService } from '../services/mqtt-topic.service';

@Component({
  selector: 'app-mqtt-topic-panel',
  templateUrl: './mqtt-topic-panel.component.html',
  styleUrls: ['./mqtt-topic-panel.component.scss']
})
export class MqttTopicPanelComponent {
  
  topic: string="";

  constructor(private mqttTopicService: MqttTopicService){}

  // Clustername/Partition/Benutzername/job_id" for a specific single job
  // Clustername/Partition/Benutzername/# for all jobs of the user
    
    updateTopic(){
      this.mqttTopicService.setTopic(this.topic);
    }

  }

