import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class SpeedService {

// Service for single speed values
private speedValuesSubject = new BehaviorSubject<number[]>([]);
speedValues = this.speedValuesSubject.asObservable();

addSpeedValue(speed: number): void {
this.speedValuesSubject.next([...this.speedValuesSubject.value, speed]);
}

// Service for JSON Objects which represent a job
private jobDataSubject = new BehaviorSubject<JSON[]>([]);
jobData = this.jobDataSubject.asObservable();

addjobData(job: JSON): void {
    this.jobDataSubject.next([...this.jobDataSubject.value, job]);
}


}