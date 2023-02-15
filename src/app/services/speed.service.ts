import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class SpeedService {
private speedValuesSubject = new BehaviorSubject<number[]>([]);
speedValues = this.speedValuesSubject.asObservable();

addSpeedValue(speed: number): void {
this.speedValuesSubject.next([...this.speedValuesSubject.value, speed]);
}
}