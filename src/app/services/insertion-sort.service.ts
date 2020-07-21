import { Injectable } from '@angular/core';
import { Bar } from '../models/bar.model';

@Injectable({
  providedIn: 'root',
})
export class InsertionSortService {
  constructor() {}

  sort(originalArray: Bar[]): Bar[][] {
    const arrayLength = originalArray.length;
    const arrayStates: Bar[][] = [];
    const originalCopy = [...originalArray];
    arrayStates.push(originalCopy);
    for (let i = 1; i < arrayLength; i++) {
      const previousState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
      const bar = previousState[i];
      let j = i - 1;
      if (!(j >= 0 && previousState[j].value > bar.value)) {
        previousState.map((b: Bar) => {
          b.compare = false;
          delete b.swap;
          return b;
        });
        previousState[j].compare = true;
        previousState[j + 1].compare = true;
        arrayStates.push(JSON.parse(JSON.stringify(previousState)));
      }
      while (j >= 0 && previousState[j].value > bar.value) {
        previousState.map((b: Bar) => {
          b.compare = false;
          delete b.swap;
          return b;
        });
        previousState[j].compare = true;
        previousState[j + 1].compare = true;
        arrayStates.push(JSON.parse(JSON.stringify(previousState)));
        const temp = previousState[j + 1];
        previousState[j + 1] = previousState[j];
        previousState[j] = temp;
        previousState[j + 1].swap = true;
        arrayStates.push(JSON.parse(JSON.stringify(previousState)));
        j = j - 1;
      }
      previousState[j + 1] = bar;
    }
    const lastState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
    const lastStateCopy = lastState.map((f: Bar) => {
      f.compare = false;
      f.final = true;
      delete f.swap;
      return f;
    });
    arrayStates.push(JSON.parse(JSON.stringify(lastStateCopy)));
    return [...arrayStates];
  }
}
