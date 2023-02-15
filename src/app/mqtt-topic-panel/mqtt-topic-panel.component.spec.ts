import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttTopicPanelComponent } from './mqtt-topic-panel.component';

describe('MqttTopicPanelComponent', () => {
  let component: MqttTopicPanelComponent;
  let fixture: ComponentFixture<MqttTopicPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttTopicPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MqttTopicPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
