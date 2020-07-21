import { Injectable } from '@angular/core';
import { Bar } from '../models/bar.model';

@Injectable({
  providedIn: 'root',
})
export class SelectionSortService {
  constructor() {}

  sort(originalArray: Bar[]): Bar[][] {
    const arrayLength = originalArray.length;
    const arrayStates: Bar[][] = [];
    const originalArrayCopy = [...originalArray];
    arrayStates.push(originalArrayCopy);
    for (let i = 0; i < arrayLength; i++) {
      let min = i;
      let j = i + 1;
      const previousState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
      const previousStateCopy = previousState.map((s: Bar) => {
        delete s.swap;
        return s;
      });
      previousStateCopy[i].compare = true;
      arrayStates.push([...previousStateCopy]);
      for (j; j < arrayLength; j++) {
        const lastState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
        const lastStateCopy = lastState.map((s: Bar) => {
          s.compare = false;
          return s;
        });
        lastStateCopy[j].compare = true;
        if (
          arrayStates[arrayStates.length - 1][min].value >
          arrayStates[arrayStates.length - 1][j].value
        ) {
          min = j;
        }
        arrayStates.push(JSON.parse(JSON.stringify([...lastStateCopy])));
      }
      const swapState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
      if (min !== i) {
        const temp = swapState[i];
        swapState[i] = swapState[min];
        swapState[min] = temp;
        swapState[i].swap = true;
      }
      const swapStateNew = swapState.map((s: Bar) => {
        s.compare = false;
        return s;
      });
      swapState[i].final = true;
      arrayStates.push([...swapStateNew]);
    }
    return [...arrayStates];
  }
}
