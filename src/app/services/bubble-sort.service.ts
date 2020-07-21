import { Injectable } from '@angular/core';
import { Bar } from '../models/bar.model';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService {
  constructor() {}

  sort(originalArray: Bar[]): Bar[][] {
    const arrayStates: Bar[][] = [];
    const originalArrayCopy = [...originalArray];
    arrayStates.push(originalArrayCopy);
    for (let i = 0; i < arrayStates[i].length; i++) {
      let found = false;
      for (let j = 0; j < arrayStates[i].length - i - 1; j++) {
        const previousState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
        const newState = previousState.map((state: Bar) => {
          state.compare = false;
          delete state.swap;
          return state;
        });

        if (newState[j] && newState[j + 1]) {
          newState[j].compare = true;
          newState[j + 1].compare = true;
          arrayStates.push(JSON.parse(JSON.stringify(newState)));
          if (newState[j].value > newState[j + 1].value) {
            found = true;
            const temp = newState[j];
            newState[j] = newState[j + 1];
            newState[j + 1] = temp;
            newState[j + 1].swap = true;
            arrayStates.push([...newState]);
          }
        }
      }
      const lastState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
      const lastStateCopy = [...lastState].map((state: Bar) => {
        state.compare = false;
        delete state.swap;
        return state;
      });
      lastStateCopy[originalArrayCopy.length - i - 1].final = true;
      arrayStates.push([...lastStateCopy]);
    }
    return [...arrayStates];
  }
}
