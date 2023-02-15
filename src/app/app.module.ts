import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule,NbSidebarModule, NbCardModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment';
import { EventStreamComponent } from './event-stream/event-stream.component';
import {EventMqttService} from './services/event.mqtt.service';
import {WebserviceService} from './services/webservice.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { MqttTopicPanelComponent } from './mqtt-topic-panel/mqtt-topic-panel.component';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
  path: '/mqtt',
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventStreamComponent,
    MqttTopicPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts")
    })
  ],
  providers: [EventMqttService, WebserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
