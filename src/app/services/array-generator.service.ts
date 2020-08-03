import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArrayTypeEnum, Bar } from '../models';

@Injectable({ providedIn: 'root' })
export class ArrayGeneratorService {
  private generatedArraySubject = new Subject<Bar[]>();
  generatedArray$: Observable<Bar[]> = this.generatedArraySubject.asObservable();

  constructor() {}

  generateArray(arrayTypeId: number, numOfBars: number) {
    switch (arrayTypeId) {
      case ArrayTypeEnum.Random:
        this.generateRandomArray(numOfBars);
        break;
      case ArrayTypeEnum.PresortedAscending:
        this.generatePresortedArrayAscending(numOfBars);
        break;
      case ArrayTypeEnum.PresortedDescending:
        this.generatePresortedArrayDescending(numOfBars);
    }
  }

  private generatePresortedArrayAscending(numOfBars: number) {
    const generatedArray = this.generateRandomIntegerArray(numOfBars);
    generatedArray.sort(this.compare);
    this.generatedArraySubject.next(generatedArray);
  }

  private generatePresortedArrayDescending(numOfBars: number) {
    const generatedArray = this.generateRandomIntegerArray(numOfBars);
    generatedArray.sort(this.compare);
    generatedArray.reverse();
    this.generatedArraySubject.next(generatedArray);
  }

  private generateRandomArray(numOfBars: number) {
    const generatedArray = this.generateRandomIntegerArray(numOfBars);
    this.generatedArraySubject.next(generatedArray);
  }

  private generateRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private generateRandomIntegerArray(numOfBars: number): Bar[] {
    const generatedArray: Bar[] = [];
    for (let i = 0; i < numOfBars; i++) {
      const int = this.generateRandomInt(10, 100);
      const bar = { compare: false, final: false, value: int };
      generatedArray.push(bar);
    }
    return generatedArray;
  }

  private compare(a: Bar, b: Bar) {
    if (a.value > b.value) {
      return 1;
    } else if (a.value < b.value) {
      return -1;
    } else {
      return 0;
    }
  }
}
